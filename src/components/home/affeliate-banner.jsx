import { LogIn, Share2, BadgeDollarSign } from "lucide-react"

const SiteData = [
  {
    SectionBgBanner: "images/frontand/TheamImage.jpg",
    SectionTitle: "EARN MONEY WITH US",
    
  },
]

export default function EarnMoneySection() {

  const { SectionBgBanner, SectionTitle } = SiteData[0]
  return (
    <section className="w-full hidden md:block">
      {/* Top Title Bar */}
      <div className="flex h-[50px] items-center justify-center bg-white">
        <h2 className="text-[15px] font-bold uppercase tracking-tight text-[#0f172a]">
          {SectionTitle}
        </h2>
      </div>

      {/* Banner */}
      <div
        className="relative h-[282px] w-full overflow-hidden"
        style={{
          backgroundImage: `url('${SectionBgBanner}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark green overlay */}
        <div className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/20" />

        

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1240px] flex-col items-center justify-center px-6 text-white">
          <div className="grid w-full grid-cols-1 gap-8 text-center md:grid-cols-3 md:gap-12">
            {/* Item 1 */}
            <div className="flex flex-col items-center">
              <LogIn className="mb-3 h-11 w-11 text-white" strokeWidth={2.2} />
              <h3 className="text-[14px] font-extrabold uppercase leading-none tracking-tight">
                SIGN UP
              </h3>
              <p className="mt-3 max-w-[260px] text-[12px] leading-5 text-white/80">
                Create your free affiliate account in minutes.
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center">
              <Share2 className="mb-3 h-10 w-10 text-white" strokeWidth={2.2} />
              <h3 className="text-[14px] font-extrabold uppercase leading-none tracking-tight">
                SHARE YOUR LINK
              </h3>
              <p className="mt-3 max-w-[300px] text-[12px] leading-5 text-white/80">
                Promote our mountin products using your unique referral link.
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center">
              <BadgeDollarSign
                className="mb-3 h-11 w-11 text-white"
                strokeWidth={2.2}
              />
              <h3 className="text-[14px] font-extrabold uppercase leading-none tracking-tight">
                EARN COMMISSIONS
              </h3>
              <p className="mt-3 max-w-[260px] text-[12px] leading-5 text-white/80">
                Get paid for every successful referral.
              </p>
            </div>
          </div>

          {/* CTA */}
          <button className="mt-10 rounded-[3px] bg-[#22c55e] px-5 py-[9px] text-[13px] font-medium text-black transition hover:bg-[#1fb157]">
            Register Now
          </button>
        </div>
      </div>
    </section>
  )
}