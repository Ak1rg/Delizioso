import OrderCatalog from "../components/order/OrderCatalog"

const Order = () => {
    return (
        <>
            <section className="ml-auto mr-auto mb-[50px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <h1 className="text-center font-tinos xs:text-[35px] lg:text-[80px] font-[700] xs:leading-[115%] lg:leading-[200%] text-colorBd">Menu</h1>
                <OrderCatalog/>
            </section>
        </>
    )
}

export default Order