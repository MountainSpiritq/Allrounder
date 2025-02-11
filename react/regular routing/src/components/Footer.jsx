import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="container-fluid">
			<div className="row">
				<div className="col-md-4 col-lg-2">
					<h3>Nyitvatartás:</h3>
				</div>
				<div className="col-md-8 col-lg-4">
					<ul>
						<li>Hétfő-Péntek: 8-17 óráig</li>
						<li>Szombat: 8-13 óráig</li>
						<li>Vasárnap: 9-12 óráig</li>
					</ul>
				</div>
				<div className="col-md-4 col-lg-2">
					<h3>Kapcsolat:</h3>
				</div>
				<div className="col-md-8 col-lg-4">
					<ul>
						<li>06-30/111-1111</li>
						<li>06-70/111-1111</li>
						<li>nevenincsbt@gmail.com</li>
					</ul>
				</div>
			</div>
		</footer>
    </div>
  )
}
