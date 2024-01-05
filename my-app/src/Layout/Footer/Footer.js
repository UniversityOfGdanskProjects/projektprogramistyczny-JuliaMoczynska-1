// import React from "react";

// function Footer() {
//     const Links = [
//         {
//             title:'Company',
//             links: [
//                 {
//                     name: 'Home',
//                     link: '/'
//                 },
//                 {
//                     name: 'Favorites',
//                     link: '/favorites'
//                 },
//                 {
//                     name: 'Watchlist',
//                     link: '/watchlist'
//                 },
//                 {
//                     name: 'Ignore',
//                     link: '/ignore'
//                 },
//                 {
//                     name: 'Movies',
//                     link: '/movies'
//                 }
//             ]
//         },
//         {
//             title:'Top Categories',
//             links: [
//                 {
//                     name: 'Action',
//                     link: '#'
//                 },
//                 {
//                     name: 'Romantic',
//                     link: '#'
//                 },
//                 {
//                     name: 'Drama',
//                     link: '#'
//                 },
//                 {
//                     name: 'Historical',
//                     link: '#'
//                 },

//             ]
//         },
//         {
//             title:'My Account',
//             links: [
//                 {
//                     name: 'Dashboard',
//                     link: '/dashboard'
//                 },
//                 {
//                     name: 'My Favorites',
//                     link: '/favorites'
//                 },
//                 {
//                     name: 'Profile',
//                     link: '/profile'
//                 },
//                 {
//                     name: 'Change Password',
//                     link: '/password'
//                 },

//             ]
//         }
//     ]
//     return(
//         <div className="bg-dry py-4 bprder=t-1 border-black">
//             <div className="container mx-auto px-2">
//                 <div className="grid grid-cols-2 md:grid-cols-7 x1:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 x1:gap-7 py-10 justify-between">
//                     {Links.map((link, index) => (
//                         <div key={index} className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0">
//                             <h3 className="text-lg lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">{link.title}</h3>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Footer