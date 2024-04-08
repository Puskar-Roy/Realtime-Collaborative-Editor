import { ThreeDots } from "react-loader-spinner";

const Loder = () => {
  return (
    <div className="h-full w-full flex justify-center items-center ">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#6366F1"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loder;
