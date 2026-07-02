const StatsCards = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="h-28 p-5 bg-main text-white rounded-2xl flex items-center justify-center">
        بطاقة إحصائية 1
      </div>
      <div className="h-28 p-5 bg-secondary text-white rounded-2xl flex items-center justify-center">
        بطاقة إحصائية 2
      </div>
      <div className="h-28 p-5 bg-main text-white rounded-2xl flex items-center justify-center">
        بطاقة إحصائية 3
      </div>
      <div className="h-28 p-5 bg-secondary text-white rounded-2xl flex items-center justify-center">
        بطاقة إحصائية 4
      </div>
    </section>
  );
};

export default StatsCards;
