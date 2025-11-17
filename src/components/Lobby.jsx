export default function Lobby({ visible }) {
  return (
    <section className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-white`}> 
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Welcome to the Lobby</h2>
        <p className="mt-2 text-gray-600">A cozy, Animal Crossing–style plaza with parks, fountains, and fellow explorers.</p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-pink-100 to-indigo-100 border border-white shadow-sm flex items-center justify-center">
              <span className="text-sm text-gray-700">Avatar #{i + 1}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-xl font-semibold text-gray-900">Parks & Fountains</h3>
          <p className="mt-2 text-gray-600">Stroll through cute parks, sit by sparkling fountains, and meet others who just dropped in.</p>
        </div>
      </div>
    </section>
  )
}
