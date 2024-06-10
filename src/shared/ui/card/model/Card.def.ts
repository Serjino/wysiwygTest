export interface ICardProps {
    src: string
    title: string
    subTitle: string
    children?: React.ReactNode
    onClick?: () => void 
}