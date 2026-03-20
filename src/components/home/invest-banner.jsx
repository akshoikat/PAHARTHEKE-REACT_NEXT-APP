import { Shield, Share2, Users } from "lucide-react"

export default function InvestSection() {
  return (
    <section className="w-full">
      {/* Top bar */}
      <div className="flex h-[48px] items-center justify-center bg-white">
        <h2 className="text-[16px] font-bold uppercase tracking-wide text-[#0f172a]">
          Invest With Us
        </h2>
      </div>

      {/* Background section */}
      <div
        className="relative h-[280px] w-full"
        style={{
          backgroundImage: "url('TheamImage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* green overlay */}
        <div className="absolute inset-0" />

        {/* content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col items-center justify-center px-6 text-white">
          <div className="grid w-full grid-cols-1 gap-8 text-center md:grid-cols-3 md:gap-12">

            {/* Item 1 */}
            <div className="flex flex-col items-center">
              <Shield className="mb-3 h-10 w-10 text-white" strokeWidth={2.2} />
              <h3 className="text-[14px] font-bold uppercase tracking-wide">
                High Returns
              </h3>
              <p className="mt-2 max-w-[260px] text-[12px] leading-5 text-white/80">
                Earn competitive returns with minimal risk, tailored to your investment goals.
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center">
              <Share2 className="mb-3 h-10 w-10 text-white" strokeWidth={2.2} />
              <h3 className="text-[14px] font-bold uppercase tracking-wide">
                Secure & Trusted
              </h3>
              <p className="mt-2 max-w-[300px] text-[12px] leading-5 text-white/80">
                We prioritize your investment security with transparent strategies and full compliance.
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center">
              <Users className="mb-3 h-10 w-10 text-[#FDC700]" strokeWidth={2.2} />
              <h3 className="text-[14px] font-bold uppercase tracking-wide">
                Expert Guidance
              </h3>
              <p className="mt-2 max-w-[280px] text-[12px] leading-5 text-white/80">
                Our experienced financial advisors help you make smart, informed investment choices.
              </p>
            </div>

          </div>

          {/* Button */}
          <button className="mt-8 rounded-[3px] bg-[#22c55e] px-6 py-2 text-[13px] font-medium text-black transition hover:bg-[#16a34a]">
            View Details
          </button>
        </div>
      </div>
    </section>
  )
}