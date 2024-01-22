const SubPanel = ({ title }: { title: string }) => (
  <>
    <div className="flex">
      <div className="w-screen pt-11">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <hr className="mt-2"></hr>
      </div>
    </div>
  </>
);
SubPanel.displayName = "SubPanel";
export { SubPanel };
