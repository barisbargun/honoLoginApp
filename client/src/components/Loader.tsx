type Props = {
  width?: number;
  height?: number;
};

const Loader = ({ width = 15, height = 15 }: Props) => {
  return (
    <img src="/assets/loader.svg" alt="loader" width={width} height={height} />
  );
};

export default Loader;
