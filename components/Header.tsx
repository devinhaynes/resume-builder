export default function Header() {
  return (
    <header className="flex justify-between p-2 items-center">
      <div className="logo-container">
        <div className="logo w-[50px] h-[50px] bg-black"></div>
      </div>
      <div className="temp">Resume Builder</div>
    </header>
  );
}
