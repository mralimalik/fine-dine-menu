import { useState } from "react";
import "./ItemDetail.css";
const ItemDetail = () => {
  const modifer = [1, 2, 4, 4, 5, ];
  return (
    <div className=" bg-white flex justify-start ">
      <div className="main-div h-screen w-[410px]  overflow-y-auto  relative overflow-hidden">
        {/* {image div} */}
        <div className="w-[410px]  object-cover h-full bg-slate-400 fixed ">
          sfdgdfg
        </div>

        {/* {bottom sheet div} */}
        <div className="bottom-sheet-div border-r h-full w-full bg-white rounded-t-[30px] 
        rounded-tr-[30px] absolute z-50 -bottom-44 px-4 py-4 flex flex-col gap-3 overflow-y-auto">
          <h3 className="font-medium text-xl text-slate-600">Spicy Salad</h3>
          <h3 className="font-normal text-base text-slate-600">
            Fresh beetroot salad served with crumbled goat cheese, walnuts, and
            tomatoes
          </h3>
          <h3 className="font-medium text-base text-red-500">$ 14.45</h3>

          {/* {Item modifier list} */}
         <div className="mt-3 mb-8">
         {modifer.map((data,index) => {
           return (
            <div key={index}>
            {/* {Modifer group} */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <h3 className="font-medium text-lg text-slate-600">Beans</h3>
                <h3 className="font-normal text-md text-slate-400">
                  (Max 5)
                </h3>
              </div>
              <div className="flex justify-center items-center px-3  py-1 bg-gray-500 rounded-full ">
                <p className="text-xs text-white ">Optional</p>
              </div>
            </div>
            {/* {Modifer items} */}
            <div>
              <div className="flex justify-between items-center my-2">
                <div>
                  <h3 className="font-normal text-base text-slate-600">
                    Arabica Beans (50 Cal)
                  </h3>
                  <h3 className="font-medium text-base text-red-500">
                    $ 14.45
                  </h3>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <div className="border border-red-400 h-7 w-7 rounded-full  flex justify-center items-center">
                    <p>-</p>
                  </div>

                  <p className="text-xl">0</p>

                  <div className="border border-red-400 h-7 w-7 rounded-full  flex justify-center items-center">
                    <p>+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
           )
          })}
         </div>

          {/* add to cart button */}

          <div className="fixed bottom-0 py-2  max-[410px]:w-full w-[410px] left-0 px-3 bg-white">
            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-2 items-center justify-center">
                <div className="border border-red-400 h-7 w-7 rounded-full  flex justify-center items-center">
                  <p>-</p>
                </div>

                <p className="text-xl">0</p>

                <div className="border border-red-400 h-7 w-7 rounded-full  flex justify-center items-center">
                  <p>+</p>
                </div>
              </div>

              <button className="w-56 bg-red-500 py-2 text-white rounded-md">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
