import StickyProductBar from "../../../../components/single-product/components/StickyProductBar"

export default function Layout({children}){

    return (
        <>
            {children}
            <StickyProductBar />
        </>
    )
}