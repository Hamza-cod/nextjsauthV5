
const layout = ({
 children
}:{
 children : React.ReactNode
}) => {
 return (
  <div className="min-h-full flex justify-center items-center
  bg-gradient-to-r to-indigo-500 from-sky-500 py-2">
   {children}
  </div>
 );
};
export default layout