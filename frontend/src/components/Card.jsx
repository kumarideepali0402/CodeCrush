export default function Card({user}) {
    const {name, skills, about, photoUrl } =user
    return <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="img" />
  </figure>
  <div className="card-body">
    <h2 className="card-title flex justify-center">{name}</h2>
    <p className=" flex justify-center">{about}</p>
    <p className=" flex justify-center">{skills}</p>
    <div className="card-actions justify-center">
        <button className="btn btn-primary">Uninterseted</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
}