export default function Breadcrumb({ path }: { path: string[] }) {
    return (
        <div className="text-sm text-gray-500 mb-2">
            {path.map((item, index) => (
                <span key={index}>
          {index > 0 && ' / '}
                    <span className={index === 0 ? 'text-orange-500' : ''}>{item}</span>
        </span>
            ))}
        </div>
    )
}
