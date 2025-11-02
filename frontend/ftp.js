const Client = require('ssh2-sftp-client');
const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');

const sftp = new Client();

const config = {
  host: "3.0.48.142",
  port: 22, // SFTP uses port 22
  username: "ec2-user",
  privateKey: fs.readFileSync('/Users/willnguyen/.ssh/id_rsa'),
  // password: "ftpuser@524790",
};

const localBuildPath = `${__dirname}/.next`;
const remoteDeployPath = "/var/www/skillbuilder/.next";

function getTotalFiles(dir) {
  let totalFiles = 0;
  const files = fs.readdirSync(dir);
  for (let file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      totalFiles += getTotalFiles(filePath);
    } else {
      totalFiles += 1;
    }
  }
  return totalFiles;
}

const totalFiles = getTotalFiles(localBuildPath);
let uploadedFiles = 0;

const progressBar = new cliProgress.SingleBar({
  format: 'Progress | {bar} | {percentage}% | {value}/{total} files',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
  clearOnComplete: true
});

async function uploadDirectory(localDir, remoteDir) {
  const files = fs.readdirSync(localDir);
  for (const file of files) {
    const localPath = path.join(localDir, file);
    const remotePath = path.join(remoteDir, file).replace(/\\/g, '/');
    const stats = fs.statSync(localPath);
    if (stats.isDirectory()) {
      try {
        await sftp.mkdir(remotePath, true);
      } catch (err) {
        // Ignore if directory already exists
      }
      await uploadDirectory(localPath, remotePath);
    } else {
      try {
        await sftp.fastPut(localPath, remotePath);
        uploadedFiles++;
        progressBar.update(uploadedFiles);
        console.log(`Uploaded: ${remotePath}`);
      } catch (err) {
        console.error(`Error uploading ${remotePath}:`, err.message);
      }
    }
  }
}

async function deploy() {
  try {
    console.log("Connecting via SFTP...");
    await sftp.connect(config);
    console.log("Connected. Starting file upload...");

    progressBar.start(totalFiles, 0);
    await uploadDirectory(localBuildPath, remoteDeployPath);
    progressBar.stop();

    console.log(`Upload completed. Files processed: ${uploadedFiles}`);
    console.log("Deployment successful!");
  } catch (err) {
    console.error("Error during deployment:", err.message);
  } finally {
    await sftp.end();
  }
}

deploy().then(() => console.log("Deployment script finished."));
