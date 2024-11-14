const About = () => {
    return (
        <>
            <section className="ml-auto mr-auto my-[150px] max-w-[1170px] w-full px-[25px] flex xs:flex-col xl:flex-row justify-between items-center">
                <img className="rounded-full w-[188px] xl:w-[546px] h-[188px] xl:h-[546px]" src="./img/about/chef_foods.png" alt="chef standing on the table with food" />
                <div className="flex flex-col">
                    <h1 className="xs:mt-[40px] xl:mt-0 xs:max-w-[290px] xl:max-w-[360px] font-tinos xs:text-[30px] xl:text-[80px] font-[700]
                    xs:leading-[34px] xl:leading-[110%] xs:text-center">
                        <span className="xl:text-left xl:block text-colorO">Our</span>
                        <span className="xs:ml-[10px] xl:ml-0 xl:block text-colorBd">Restautant</span>
                    </h1>
                    <p className="xs:mt-[20px] xl:mt-[60px] xs:text-center xl:text-left xs:max-w-[290px] xl:max-w-[424px] font-poppins xs:text-[12px] xl:text-[20px] font-[400]
                    xs:leading-[22px] xl:leading-[200%] text-colorB">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse.
                    </p>
                </div>
            </section>
            <section className="ml-auto mr-auto xs:mt-0 xl:mt-[400px] xs:mb-[150px] xl:mb-[400px] max-w-[1170px] w-full px-[25px] flex xs:flex-col xl:flex-row justify-between items-center">
                <p className="xs:mt-[20px] xl:mt-[60px] xs:text-center xl:text-left xs:max-w-[290px] xl:max-w-[424px] font-poppins xs:text-[12px] xl:text-[20px] font-[400]
                xs:leading-[22px] xl:leading-[200%] text-colorB">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>
                <img className="xs:mt-[40px] xl:mt-0  rounded-full w-[188px] xl:w-[546px] h-[188px] xl:h-[546px]" src="./img/about/dishe_food.png" alt="dishe food upper the table" />
            </section>
            <section className="ml-auto mr-auto xs:mt-0 xl:mt-[400px] mb-[200px] max-w-[1170px] w-full px-[25px] flex xs:flex-col xl:flex-row justify-between items-center">
                <img className="xs:rounded-[23px] xl:rounded-none xs:mt-[40px] xl:mt-0  w-[148px] xl:w-[460px] h-[222px] xl:h-[690px]" src="./img/about/main_chef.png" alt="photo of the main chef" />
                <div className="flex flex-col">
                    <h2 className="xs:mt-[40px] xl:mt-0 xs:max-w-[290px] xl:max-w-[530px] font-tinos xs:text-[30px] xl:text-[80px] font-[700]
                    xs:leading-[34px] xl:leading-[110%] xs:text-center">
                        <span className="xl:text-left block text-colorO">Owner <span className="text-colorBd">&</span></span>
                        <span className="block text-colorBd">Executive Chef</span>
                    </h2>
                    <p className="xs:text-center xl:text-left xs:mt-[20px] xl:mt-[40px] font-poppins xs:text-[16px] xl:text-[40px] font-[600]
                    xs:leading-[24px] xl:leading-[60px]">Ismail Marzuki</p>
                    <p className="xs:mt-[20px] xl:mt-[60px] xs:text-center xl:text-left xs:max-w-[290px] xl:max-w-[495px] font-poppins xs:text-[14px] xl:text-[30px] font-[300]
                    leading-[200%] text-colorB">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </section>
        </>
    )
}

export default About