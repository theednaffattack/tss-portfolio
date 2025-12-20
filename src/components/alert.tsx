const Alert = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
  >
    {children}
  </div>
)

export default Alert
