interface SpinnerProps {
  fullScreen?: boolean;
}

export const Spinner = ({ fullScreen = false }: SpinnerProps) => {
  return (
    <div className={`flex justify-center items-center ${fullScreen ? 'h-screen' : 'min-h-[100px]'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500/20 border-t-pink-500" />
    </div>
  );
};
