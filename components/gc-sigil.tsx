import Image from 'next/image'

interface GCSigilProps {
  size?: number
  dark?: boolean
}

export function GCSigil({ size = 48 }: GCSigilProps) {
  return (
    <Image
      src="/gc-sigle.png"
      alt="Grande Charte"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  )
}

export default GCSigil
