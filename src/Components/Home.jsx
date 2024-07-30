// import  { useState, useEffect } from 'react';

// const ImageComponent = () => {
//   const [imageSrc, setImageSrc] = useState(null);

//   useEffect(() => {
//     const load = () => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve('https://i.ibb.co/2M7rtLk/Remote1.png');
//         }, 1000);
//       });
//     };

//     load().then((src) => {
//       setImageSrc(src);
//     });
//   }, []);

//   return (
//     <div>
//       {imageSrc ? (
//         <img src={imageSrc} className="w-96" alt="Loaded" />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

function Home() {
    return (
        <>
            <div className="my-10 gap-14 flex flex-col text-white">
                <div className="flex flex-row items-center justify-center gap-32">
                    {<img src="https://i.ibb.co/2M7rtLk/Remote1.png" className="w-96" alt="" />}
                    {/* {ImageComponent()} */}
                    <h1 className="w-96">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam repellendus porro, voluptas a, officiis architecto commodi soluta vero iure quisquam esse distinctio incidunt quidem iste quae perferendis delectus eum officia qui, quo amet placeat enim optio! Voluptatem quis saepe voluptas similique ipsa minus, impedit placeat minima omnis atque magnam libero vitae nobis perferendis, architecto eligendi quae quos doloremque obcaecati facilis.</h1>
                </div>
                <div className="flex flex-row items-center justify-center gap-32">
                    <h1 className="w-96">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam repellendus porro, voluptas a, officiis architecto commodi soluta vero iure quisquam esse distinctio incidunt quidem iste quae perferendis delectus eum officia qui, quo amet placeat enim optio! Voluptatem quis saepe voluptas similique ipsa minus, impedit placeat minima omnis atque magnam libero vitae nobis perferendis, architecto eligendi quae quos doloremque obcaecati facilis.</h1>
                    <img src="https://i.ibb.co/2M7rtLk/Remote1.png" className="w-96" alt="" />
                </div>
            </div>
        </>
    )
}

export default Home