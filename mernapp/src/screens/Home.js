import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { PORT } from '../components/Constants';

export default function Home() {

  const [search, setSearch] = useState('');
  //yaha par use state me default value iski array lere hai kyuki agar object lete to uspe map function nai laga pate
  const [item_category, setItem_category] = useState([]);
  const [food_items, setFlours] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/food-data", {
    method: "POST",
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });

  response = await response.json();

  setFlours(response[0]);
  setItem_category(response[1]);
  //kyuki backend se ek variables ki array arie toh usko access krne k lie
  //console.log(response[0], response[1])

}

useEffect(() => {
  loadData()
}, [])
//  ^ yaha par empty array yani empty dependency dene ka ye matlb 
//hai ki on first render jo bhi useeffect me functions die hai wo load hojae
 
return (
  //we can send only one div in return and if we want multiple divs we need nested divs
  <div>

    <div> <Navbar /> </div>
    <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
      <div className="carousel-inner" id='carousel'>
        {/* here index is set to value > 0 so that the search bar comes above the carausel in the frontend */}
        <div className='carousel-caption' style={{ zIndex: "10" }}>
          <div class="d-flex justify-content-center">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
            {/* <button class="btn btn-outline-success text-white " type="submit">Search</button> */}
          </div>
        </div>

        <div className="carousel-item active">
          <img src="https://source.unsplash.com/random/900x700/?fruits-vegetables" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/900x700/?grains" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/900x700/?beverages" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/900x700/?dryfruits" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
    <div className='container'>
      {
        item_category !== []
          ? item_category.map((data) => {
            return (<div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              {/* hr tag is used to enter a line between the output */}
              <hr />
              {food_items !== []
                ?
                food_items.filter((item) => (item.CategoryName === data.CategoryName) && (item.productName.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map(filterItems => {
                    return (
                      // apna jo front page hota hai 12 x 12 k grids me 
                      //divided hota hai to page ko responsive banane k lie apan is grid ka rows aur cols banane k lie use krte hai
                      // col-12 ka matlb hai ki jab badi screen hai to pure 12 cols me card show ho
                      //col-md-12 matlb kab screen medium size ki ho to 6 cols use ho grid k jisme card show hoga
                      //
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodItem={filterItems}
                        ></Card>
                      </div>
                    )
                  }) : <div>no such data found</div>}
            </div>
            )
          })
          : ""
      }

    </div>
    <div><Footer /></div>
  </div>
)
}
