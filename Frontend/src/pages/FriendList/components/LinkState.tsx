const LinkState = ({ isOnline }: { isOnline: boolean }) => {
  return (
    <div
      className={`w-[10px] h-[10px] rounded-full ${
        isOnline ? 'bg-green-400' : 'bg-red-400'
      }`}
    ></div>
  )
}


export default LinkState