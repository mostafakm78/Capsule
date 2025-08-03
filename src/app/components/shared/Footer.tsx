export default function Footer() {
    return (
        <section className="flex relative bg-linear-to-b from-background to-foreground/20 justify-center pt-12 items-center">
      <div className="flex flex-col px-10 items-center py-6 gap-8 rounded-lg w-full">
        <div className="flex items-center justify-center gap-16 w-full">
          <div className="flex flex-col w-1/2 gap-10 justify-center items-center">
            <div className="text-center">
              <h2 className="title-one text-5xl font-kalmeh text-foreground">خاطره بساز</h2>
              <p className="title-one text-lg text-muted/80 font-light mt-3">لحظه‌هات رو با صدا، تصویر یا متن ثبت کن</p>
            </div>
            <div className="text-center">
              <h2 className="title-two text-5xl font-kalmeh text-foreground">کپسول کن</h2>
              <p className="title-two text-lg text-muted/80 font-light mt-3">بهش زمان بده تا در آینده باز بشه</p>
            </div>
            <div className="text-center">
              <h2 className="title-three text-5xl font-kalmeh text-foreground">بفرست</h2>
              <p className="title-three text-lg text-muted/80 font-light mt-3">برای خودت یا کسی که دوستش داری</p>
            </div>
          </div>
          <div className="px-10 w-1/2">
            <div className="flex flex-col w-full gap-12 justify-center items-center">
              
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}
