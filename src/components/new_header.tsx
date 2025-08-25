import * as React from 'react';

// Component props (empty for now) - declared for TSX clarity
interface NewHeaderProps {}

// Responsive version of NewHeader using Tailwind utility classes.
// - fills the viewport width (w-full)
// - uses max-width container for content centering
// - replaces fixed px widths/heights with responsive percentages, vw-based sizes and Tailwind breakpoints
// - decorative blobs use responsive vw sizing and positioned with percentages so they scale

const NewHeader: React.FC<NewHeaderProps> = () => {
  return (
    <header className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-900 relative text-white overflow-visible lg:overflow-hidden">
      {/* Top contact bar */}
      <div className="w-full bg-gray-900/80 py-3 px-6 flex justify-center items-center sticky top-0 z-30">
        <div className="max-w-screen-2xl w-full flex items-center justify-center px-4">
          <p className="text-sm sm:text-base font-semibold text-white/80 text-center">
            (03) 9551 6555 · 292 Boundary Road, Dingley Village VIC 3172
          </p>
        </div>
      </div>

      {/* Decorative background blobs (absolute) */}
      <div className="pointer-events-none">
        <div className="absolute -left-10 -top-20 w-[40vw] h-[40vw] sm:w-[28vw] sm:h-[28vw] rounded-full bg-yellow-800/30 blur-3xl transform -z-10" />
        <div className="absolute right-0 -top-10 w-[28vw] h-[28vw] sm:w-[18vw] sm:h-[18vw] rounded-full bg-cyan-900/40 blur-2xl transform -z-10" />
        <div className="absolute left-0 top-[55vh] w-[50vw] h-[30vw] rounded-full bg-slate-500/20 blur-3xl transform -z-10" />
      </div>

      {/* Hero section */}
      <section className="max-w-screen-2xl mx-auto w-full px-6 lg:px-12 py-12 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left column - text */}
        <div className="flex-1 max-w-2xl w-full">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full border border-slate-600 text-xs tracking-wider uppercase text-slate-300 font-semibold">
              10 years of experience
            </span>
          </div>

          <h1 className="text-[clamp(28px,3.5vw,64px)] sm:text-[clamp(36px,4.2vw,72px)] font-bold leading-tight tracking-wider font-[Bebas_Neue] uppercase text-white">
            Hey, we are Carmotive <span className="inline-block">👋</span>
            <br className="hidden sm:block" />
            we do various services for your car.
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-blue-100 max-w-xl tracking-wide">
            Service & Maintenance | Roadworthy Check | Brakes & Suspension | Ignition & Starting Systems | AC, Heating & Cooling | Tyres & Exhaust...
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg shadow-md">
              <img src="https://placehold.co/43x45" alt="avatar" className="w-9 h-9 rounded-full object-cover" />
              <span>Schedule now</span>
            </button>

            <button className="hidden sm:inline-block bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-xl">
              Services
            </button>
          </div>
        </div>

        {/* Right column - image / hero media */}
        <div className="w-full lg:w-1/2 max-w-xl flex-shrink-0">
          <img
            src="https://placehold.co/620x930"
            alt="Hero"
            className="w-full h-auto rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* Services cards grid - responsive, fills width */}
      {/* Large screens: keep the original "Carmotive" style from your design */}
      <section className="hidden 2xl:block">
        <div className="mx-auto w-full max-w-[min(1600px,95vw)] 2xl:scale-105 2xl:origin-top relative flex justify-center">
          <div className="inline-flex justify-center items-end gap-10 flex-wrap content-end">
            <div className="h-[726px] flex justify-center items-end gap-10">
              <div className="w-[642.47px] bg-gray-950 outline outline-1 outline-offset-[-1px] outline-cyan-950 flex justify-between items-end">
                <img className="w-80 h-[721px] object-cover" src="https://placehold.co/320x721" alt="service-img-1" />
                <div className="w-64 h-[533.89px] relative">
                  <div className="w-64 h-[493.89px] left-0 top-[-6px] absolute">
                    <div className="w-64 left-0 top-0 absolute inline-flex flex-col justify-start items-start gap-28">
                      <div className="self-stretch flex flex-col justify-start items-start gap-5">
                        <div className="w-48 justify-start text-white text-5xl font-normal font-['Bebas_Neue'] leading-[48.54px] tracking-wide">Vehicle Inspections</div>
                        <div className="w-60 justify-start text-gray-200 text-base font-semibold font-['Montserrat'] leading-normal tracking-tight">If you’re planning on selling or  otherwise transferring ownership of a vehicle, you first have to obtain a roadworthy certificate, issued by a licensed tester after a thorough  inspection. </div>
                      </div>
                      <div className="w-48 h-24 inline-flex justify-start items-start">
                        <div className="w-48 h-24 inline-flex flex-col justify-start items-start gap-4">
                          <div className="self-stretch h-9 px-10 py-[3px] bg-black/40 rounded-lg outline outline-1 outline-offset-[-0.90px] outline-red-600/70 inline-flex justify-center items-center gap-2.5">
                            <div className="justify-start text-gray-200/90 text-base font-semibold font-['Montserrat'] leading-loose tracking-tight">Learn more</div>
                          </div>
                          <div className="w-48 h-14 px-6 py-0.5 bg-red-500 rounded-lg inline-flex justify-center items-center gap-2.5">
                            <div className="justify-start text-white text-2xl font-normal font-['Bebas_Neue'] leading-[48.54px] tracking-wide [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">Schedule now</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[642.47px] bg-gray-950 outline outline-1 outline-offset-[-1px] outline-cyan-950 flex justify-between items-end">
                <div className="w-80 h-[721px] bg-gradient-to-b from-black/0 to-gray-950/20" />
                <div className="w-64 h-[559.11px] relative">
                  <div className="w-64 left-0 top-[20px] absolute inline-flex flex-col justify-start items-start gap-5">
                    <div className="w-48 justify-start text-white text-5xl font-normal font-['Bebas_Neue'] leading-[48.54px] tracking-wide">Logbook
                    Servicing</div>
                    <div className="self-stretch h-48 inline-flex flex-col justify-start items-start">
                      <div className="w-6 h-6 shadow-[0px_3.595505714416504px_3.595505714416504px_0px_rgba(0,0,0,0.41)] outline outline-2 outline-offset-[-0.96px] outline-lime-500" />
                      <div className="w-56 justify-start text-gray-200 text-base font-semibold font-['Montserrat'] leading-loose tracking-tight">Petrol Vehicles</div>
                      <div className="w-6 h-6 shadow-[0px_3.595505714416504px_3.595505714416504px_0px_rgba(0,0,0,0.41)] outline outline-2 outline-offset-[-0.96px] outline-lime-500" />
                      <div className="w-56 justify-start text-gray-200 text-base font-semibold font-['Montserrat'] leading-loose tracking-tight">Diesel Vehicles</div>
                      <div className="w-6 h-6 shadow-[0px_3.595505714416504px_3.595505714416504px_0px_rgba(0,0,0,0.41)] outline outline-2 outline-offset-[-0.96px] outline-lime-500" />
                      <div className="w-56 justify-start text-gray-200 text-base font-semibold font-['Montserrat'] leading-loose tracking-tight">LPG Vehicles</div>
                      <div className="w-6 h-6 shadow-[0px_3.595505714416504px_3.595505714416504px_0px_rgba(0,0,0,0.41)] outline outline-2 outline-offset-[-0.96px] outline-lime-500" />
                      <div className="w-40 justify-start"><span className="text-gray-200 text-base font-semibold font-['Montserrat'] leading-loose tracking-tight">Electric/Hybrid </span><span className="text-gray-200 text-base font-semibold font-['Montserrat'] leading-snug tracking-tight">Vehicles</span></div>
                    </div>
                  </div>
                  <div className="w-48 h-24 left-0 top-[435.23px] absolute inline-flex justify-start items-start">
                    <div className="w-48 h-24 inline-flex flex-col justify-start items-start gap-4">
                      <div className="self-stretch h-9 px-10 py-[3px] bg-black/40 rounded-lg outline outline-1 outline-offset-[-0.90px] outline-red-600/70 inline-flex justify-center items-center gap-2.5">
                        <div className="justify-start text-gray-200/90 text-base font-semibold font-['Montserrat'] leading-loose tracking-tight">Learn more</div>
                      </div>
                      <div className="w-48 h-14 px-6 py-0.5 bg-red-500 rounded-lg inline-flex justify-center items-center gap-2.5">
                        <div className="justify-start text-white text-2xl font-normal font-['Bebas_Neue'] leading-[48.54px] tracking-wide [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">Schedule now</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[642.47px] bg-gray-950 outline outline-1 outline-offset-[-1px] outline-cyan-950 flex justify-between items-end">
              <img className="w-80 h-[721px] object-cover" src="https://placehold.co/320x721" alt="service-img-3" />
              <div className="w-64 h-[533.89px] relative">
                <div className="w-64 left-0 top-[-6px] absolute inline-flex justify-start items-center gap-2.5">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-28">
                    <div className="self-stretch h-72 flex flex-col justify-start items-start gap-5">
                      <div className="w-56 justify-start text-white text-5xl font-normal font-['Bebas_Neue'] leading-[48.54px] tracking-wide">Air Conditioning</div>
                      <div className="w-60 h-44 justify-start text-gray-200 text-base font-semibold font-['Montserrat'] leading-normal tracking-tight">Your vehicle’s air conditioning degrades  faster from disuse than from use, as the rubber tubing and seals dry up  and crack if unused for long periods, allowing the refrigerant gas to  leak out and rob your aircon of its cooling power.</div>
                    </div>
                    <div className="w-48 h-24 flex flex-col justify-start items-start gap-4">
                      <div className="self-stretch h-9 px-10 py-[3px] bg-black/40 rounded-lg outline outline-1 outline-offset-[-0.90px] outline-red-600/70 inline-flex justify-center items-center gap-2.5">
                        <div className="justify-start text-gray-200/90 text-base font-semibold font-['Montserrat'] leading-loose tracking-tight">Learn more</div>
                      </div>
                      <div className="w-48 h-14 px-6 py-0.5 bg-red-500 rounded-lg inline-flex justify-center items-center gap-2.5">
                        <div className="justify-start text-white text-2xl font-normal font-['Bebas_Neue'] leading-[48.54px] tracking-wide [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">Schedule now</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[642.47px] bg-gray-950 outline outline-1 outline-offset-[-1px] outline-cyan-950 flex justify-between items-end">
              <img className="w-80 h-[721px] object-cover" src="https://placehold.co/320x721" alt="service-img-4" />
              <div className="w-64 h-[533.89px] relative">
                <div className="w-64 left-0 top-[-6px] absolute inline-flex justify-start items-center gap-2.5">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-28">
                    <div className="self-stretch h-72 flex flex-col justify-start items-start gap-5">
                      <div className="w-56 justify-start text-white text-5xl font-normal font-['Bebas_Neue'] leading-[48.54px] tracking-wide">Clutch and Transmission</div>
                      <div className="w-60 h-44 justify-start text-gray-200 text-base font-['Montserrat'] leading-normal tracking-tight">As part of the assembly that transfers  power from the engine to the wheels, the clutch and transmission are  made up of some of the most complex machinery in your vehicle. Due to  their sophisticated nature, even minor problems can quickly escalate  into very costly repairs.</div>
                    </div>
                    <div className="w-48 h-24 flex flex-col justify-start items-start gap-4">
                      <div className="self-stretch h-9 px-10 py-[3px] bg-black/40 rounded-lg outline outline-1 outline-offset-[-0.90px] outline-red-600/70 inline-flex justify-center items-center gap-2.5">
                        <div className="justify-start text-gray-200/90 text-base font-semibold font-['Montserrat'] leading-loose tracking-tight">Learn more</div>
                      </div>
                      <div className="w-48 h-14 px-6 py-0.5 bg-red-500 rounded-lg inline-flex justify-center items-center gap-2.5">
                        <div className="justify-start text-white text-2xl font-normal font-['Bebas_Neue'] leading-[48.54px] tracking-wide [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">Schedule now</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Small screens: use the responsive grid I created earlier */}
      <section className="block lg:hidden max-w-screen-2xl mx-auto w-full px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <article key={i} className="bg-gray-950 p-6 rounded-2xl border border-slate-800">
              <img src="https://placehold.co/320x321" alt={`service-${i}`} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-2xl font-[Bebas_Neue] mb-2">Service title</h3>
              <p className="text-sm text-slate-300">Short service description that wraps naturally on small screens.</p>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 rounded-md bg-black/40 border border-red-600 text-slate-200">Learn more</button>
                <button className="px-4 py-2 rounded-md bg-red-600 text-white">Schedule now</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About / FAQ block - responsive */}
      <section className="max-w-screen-2xl mx-auto w-full px-6 lg:px-12 py-12">
        <div className="bg-zinc-950/80 p-8 rounded-3xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-4xl font-[Bebas_Neue] mb-4">Who we are</h2>
              <p className="text-lg text-blue-100">Carmotive is an automotive repairs workshop which focuses on providing an all-encompassing service to our valued customers in southeastern Melbourne...</p>
            </div>
            <div>
              <h3 className="text-3xl mb-4">FAQ</h3>
              <div className="space-y-4">
                <div className="p-4 bg-zinc-900/70 rounded-lg">
                  <h4 className="text-xl font-semibold">What are your hours of operation?</h4>
                  <p className="text-slate-300">Carmotive is open five days a week, from 8:00am to 5:30pm Monday to Friday.</p>
                </div>

                <div className="p-4 bg-zinc-900/70 rounded-lg">
                  <h4 className="text-xl font-semibold">Do I need to book a visit?</h4>
                  <p className="text-slate-300">Yes — please call to set up an appointment so we can prepare and avoid long wait times.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-24" />
    </header>
  );
};

export default NewHeader;
