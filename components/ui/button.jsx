export default function Button({children, style=''}){
    return (
        <button className={`bg-button hover:bg-hover ${style}`}>
            {children}
        </button>
    )
}