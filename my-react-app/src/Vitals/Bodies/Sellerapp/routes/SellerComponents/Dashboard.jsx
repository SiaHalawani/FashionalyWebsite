// import React, { useState, useEffect } from 'react';
// import { useSellerState } from '../../../../../BackendIntegration/SellerData/SellerDataManagement';
// import { getClickSummary, getExplorePosts, getSellerFull } from '../../../../../BackendIntegration/AxiosConnections/UserGetConnections/SellerInsight';

// import { Bar, Line, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

// export default function Dashboard() {
//   const { sellerProfile, sellerComponents, sellerPosts } = useSellerState();
//   const stats = sellerProfile?.stats || {};
//   const adBudget = sellerProfile?.adBudget || {};
//   const [fullData, setFullData] = useState(null);
// const [clickSummaries, setClickSummaries] = useState([]);
// const [explorePosts, setExplorePosts] = useState([]);


//   const totalItems = sellerComponents?.reduce((acc, link) => acc + (link.items?.length || 0), 0) || 0;
//   const totalPosts = sellerPosts?.reduce((acc, link) => acc + (link.items?.length || 0), 0) || 0;

//   const [itemFilters, setItemFilters] = useState({
//     name: '',
//     category: '',
//     brand: '',
//     gender: 'all',
//     minPrice: '',
//     maxPrice: ''
//   });

//   const [postFilters, setPostFilters] = useState({
//     caption: '',
//     category: '',
//     minLikes: '',
//     maxLikes: '',
//     minComments: '',
//     maxComments: '',
//     dateFrom: '',
//     dateTo: ''
//   });

//   const filteredItems = sellerComponents.flatMap(group =>
//     group.items
//       .filter(item =>
//         (!itemFilters.name || item.itemName.toLowerCase().includes(itemFilters.name.toLowerCase())) &&
//         (!itemFilters.category || group.title.toLowerCase().includes(itemFilters.category.toLowerCase())) &&
//         (!itemFilters.brand || item.brand.toLowerCase().includes(itemFilters.brand.toLowerCase())) &&
//         (itemFilters.gender === 'all' || item.gender === itemFilters.gender) &&
//         (!itemFilters.minPrice || item.price >= parseFloat(itemFilters.minPrice)) &&
//         (!itemFilters.maxPrice || item.price <= parseFloat(itemFilters.maxPrice))
//       )
//       .map(item => ({ ...item, category: group.title }))
//   );

//   const filteredPosts = sellerPosts.flatMap(group =>
//     group.posts
//       .filter(post => {
//         const date = new Date(post.timestamp);
//         return (
//           (!postFilters.caption || post.caption.toLowerCase().includes(postFilters.caption.toLowerCase())) &&
//           (!postFilters.category || group.title.toLowerCase().includes(postFilters.category.toLowerCase())) &&
//           (!postFilters.minLikes || post.likes >= parseInt(postFilters.minLikes)) &&
//           (!postFilters.maxLikes || post.likes <= parseInt(postFilters.maxLikes)) &&
//           (!postFilters.minComments || post.comments >= parseInt(postFilters.minComments)) &&
//           (!postFilters.maxComments || post.comments <= parseInt(postFilters.maxComments)) &&
//           (!postFilters.dateFrom || date >= new Date(postFilters.dateFrom)) &&
//           (!postFilters.dateTo || date <= new Date(postFilters.dateTo))
//         );
//       })
//       .map(post => ({ ...post, category: group.title }))
//   );

//   const barData = {
//     labels: ['Sales', 'Orders', 'Returns', 'Items', 'Posts'],
//     datasets: [
//       {
//         label: 'Performance Stats',
//         data: [stats.sales, stats.orders, stats.returns, totalItems, totalPosts],
//         backgroundColor: 'rgba(153, 102, 255, 0.5)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   const lineData = {
//     labels: ['Revenue', 'Followers', 'Rating'],
//     datasets: [
//       {
//         label: 'Engagement',
//         data: [stats.revenue, stats.followers, stats.rating],
//         fill: false,
//         borderColor: 'rgba(255, 159, 64, 1)',
//         tension: 0.4
//       }
//     ]
//   };

//   const pieData = {
//     labels: ['Spent', 'Remaining'],
//     datasets: [
//       {
//         data: [
//           adBudget.spent || 0,
//           (adBudget.currentBudget || 0) - (adBudget.spent || 0)
//         ],
//         backgroundColor: ['#FF6384', '#36A2EB']
//       }
//     ]
//   };
//   const clickBar = {
//     labels: clickSummaries.map((_, i) => `Post ${i + 1}`),
//     datasets: [{
//       label: 'Clicks per Post',
//       data: clickSummaries.map(entry => entry?.clicks || 0),
//       backgroundColor: 'rgba(54, 162, 235, 0.5)',
//     }]
//   };
  
//   const exploreRelevance = {
//     labels: explorePosts.map((_, i) => `Post ${i + 1}`),
//     datasets: [{
//       label: 'Relevance Score',
//       data: explorePosts.map(post => post?.relevanceScore || 0),
//       backgroundColor: 'rgba(255, 206, 86, 0.5)',
//     }]
//   };
  
//   useEffect(() => {
//     const fetchInsights = async () => {
//       if (!sellerProfile?.sellerId) return;
//       const full = await getSellerFull(sellerProfile.sellerId);
//       setFullData(full);
//       const posts = full?.sellerPosts?.flatMap(group => group.posts || []) || [];
//       const clicks = await Promise.all(
//         posts.map(post => getClickSummary(post["id "]?.trim?.() || post.id, full.sellerId))
//       );
//       setClickSummaries(clicks);
//       const explore = await getExplorePosts(full.sellerId);
//       setExplorePosts(explore);
//     };
//     fetchInsights();
//   }, [sellerProfile]);
  

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Dynamic Seller Dashboard</h2>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div style={{ width: '30%' }}>
//           <h3>Performance (Bar)</h3>
//           <Bar data={barData} />
//         </div>
//         <div style={{ width: '30%' }}>
//           <h3>Engagement (Line)</h3>
//           <Line data={lineData} />
//         </div>
//         <div style={{ width: '30%' }}>
//           <h3>Ad Budget (Pie)</h3>
//           <Pie data={pieData} />
//         </div>
//       </div>
  
//       <div style={{ marginTop: '20px' }}>
//         <h3>Date Reference</h3>
//         <DatePicker selected={new Date()} readOnly />
//       </div>
  
//       <div style={{ marginTop: '40px' }}>
//         <h3>Item Search & Filter</h3>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
//           <input placeholder="Name" onChange={(e) => setItemFilters(prev => ({ ...prev, name: e.target.value }))} />
//           <input placeholder="Category" onChange={(e) => setItemFilters(prev => ({ ...prev, category: e.target.value }))} />
//           <input placeholder="Brand" onChange={(e) => setItemFilters(prev => ({ ...prev, brand: e.target.value }))} />
//           <input placeholder="Min Price" type="number" onChange={(e) => setItemFilters(prev => ({ ...prev, minPrice: e.target.value }))} />
//           <input placeholder="Max Price" type="number" onChange={(e) => setItemFilters(prev => ({ ...prev, maxPrice: e.target.value }))} />
//           <select onChange={(e) => setItemFilters(prev => ({ ...prev, gender: e.target.value }))}>
//             <option value="all">All Genders</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="unisex">Unisex</option>
//           </select>
//         </div>
  
//         <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ background: '#eee' }}>
//               <th>Category</th>
//               <th>Item Name</th>
//               <th>Price</th>
//               <th>Brand</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredItems.map(item => (
//               <tr key={item.id}>
//                 <td>{item.category}</td>
//                 <td>{item.itemName}</td>
//                 <td>${item.price}</td>
//                 <td>{item.brand}</td>
//                 <td>{item.gender}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
  
//       <div style={{ marginTop: '40px' }}>
//         <h3>Post Search & Filter</h3>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
//           <input placeholder="Caption" onChange={(e) => setPostFilters(prev => ({ ...prev, caption: e.target.value }))} />
//           <input placeholder="Category" onChange={(e) => setPostFilters(prev => ({ ...prev, category: e.target.value }))} />
//           <input placeholder="Min Likes" type="number" onChange={(e) => setPostFilters(prev => ({ ...prev, minLikes: e.target.value }))} />
//           <input placeholder="Max Likes" type="number" onChange={(e) => setPostFilters(prev => ({ ...prev, maxLikes: e.target.value }))} />
//           <input placeholder="Min Comments" type="number" onChange={(e) => setPostFilters(prev => ({ ...prev, minComments: e.target.value }))} />
//           <input placeholder="Max Comments" type="number" onChange={(e) => setPostFilters(prev => ({ ...prev, maxComments: e.target.value }))} />
//           <input type="date" onChange={(e) => setPostFilters(prev => ({ ...prev, dateFrom: e.target.value }))} />
//           <input type="date" onChange={(e) => setPostFilters(prev => ({ ...prev, dateTo: e.target.value }))} />
//         </div>
  
//         <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ background: '#eee' }}>
//               <th>Category</th>
//               <th>Caption</th>
//               <th>Likes</th>
//               <th>Comments</th>
//               <th>Timestamp</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPosts.map(post => (
//               <tr key={post.id}>
//                 <td>{post.category}</td>
//                 <td>{post.caption}</td>
//                 <td>{post.likes}</td>
//                 <td>{post.comments}</td>
//                 <td>{new Date(post.timestamp).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
  
//       <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-around' }}>
//         <div style={{ width: '45%' }}>
//           <h4>Click Summary</h4>
//           <Bar data={clickBar} />
//         </div>
//         <div style={{ width: '45%' }}>
//           <h4>Explore Relevance Scores</h4>
//           <Bar data={exploreRelevance} />
//         </div>
//       </div>
  
//       <div style={{ marginTop: '40px' }}>
//         <h4>Click Insights Table</h4>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f0f0f0' }}>
//               <th>Post ID</th>
//               <th>Clicks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {clickSummaries.map((entry, idx) => (
//               <tr key={idx}>
//                 <td>{fullData?.sellerPosts?.flatMap(g => g.posts)[idx]?.["id "]?.trim?.() || fullData?.sellerPosts?.flatMap(g => g.posts)[idx]?.id}</td>
//                 <td>{entry?.clicks || 0}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
  
// }
import React, { useState } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DashboardVisuals.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [itemFilters, setItemFilters] = useState({});
  const [postFilters, setPostFilters] = useState({});

  const fakeItems = [
    { id: 1, itemName: 'Hoodie', price: 45, brand: 'Zara', gender: 'unisex', category: 'Winter' },
    { id: 2, itemName: 'Sneakers', price: 120, brand: 'Nike', gender: 'male', category: 'Shoes' },
    { id: 3, itemName: 'Sunglasses', price: 60, brand: 'RayBan', gender: 'female', category: 'Accessories' }
  ];

  const fakePosts = [
    { id: 1, caption: 'New drop🔥', likes: 100, comments: 12, timestamp: Date.now(), category: 'Launch' },
    { id: 2, caption: 'Sale announcement', likes: 80, comments: 9, timestamp: Date.now(), category: 'Promotion' }
  ];

  // Chart data
  const barData = {
    labels: ['Items', 'Posts', 'Orders', 'Followers'],
    datasets: [{
      label: 'This Month',
      data: [45, 30, 120, 300],
      backgroundColor: ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444']
    }]
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Ad Spend',
      data: [200, 350, 300, 500],
      borderColor: '#3b82f6',
      backgroundColor: '#bfdbfe',
      fill: true,
      tension: 0.3
    }]
  };

  const pieData = {
    labels: ['Reach', 'Conversions'],
    datasets: [{
      data: [600, 150],
      backgroundColor: ['#f472b6', '#60a5fa']
    }]
  };

  const revenueTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Revenue $',
      data: [1200, 1800, 1600, 2100],
      backgroundColor: 'rgba(34,197,94,0.6)',
    }]
  };

  const genderSplit = {
    labels: ['Male', 'Female', 'Unisex'],
    datasets: [{
      label: 'Item Distribution',
      data: [5, 7, 3],
      backgroundColor: ['#60a5fa', '#f472b6', '#facc15']
    }]
  };

  return (
    <div className={styles.dashboardWrapper}>
      <h2 className={styles.title}>📊 Seller Dashboard Overview</h2>

      {/* Grid Row of Compact Graphs */}
      <div className={styles.graphGrid}>
        <div className={styles.graphCard}><Bar data={barData} /></div>
        <div className={styles.graphCard}><Line data={lineData} /></div>
        <div className={styles.graphCard}><Pie data={pieData} /></div>
        <div className={styles.graphCard}><Bar data={revenueTrend} /></div>
        <div className={styles.graphCard}><Doughnut data={genderSplit} /></div>
      </div>

      {/* Key Insight Cards */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}><h4>🛍️ Orders</h4><p>128</p></div>
        <div className={styles.kpiCard}><h4>👤 Followers</h4><p>492</p></div>
        <div className={styles.kpiCard}><h4>⭐ Avg. Rating</h4><p>4.8</p></div>
        <div className={styles.kpiCard}><h4>💰 Revenue</h4><p>$5,320</p></div>
      </div>

      {/* Date Section */}
      <div className={styles.section}>
        <h3>Date Reference</h3>
        <DatePicker selected={new Date()} readOnly />
      </div>

      {/* Item Filter */}
      <div className={styles.section}>
        <h3>Item Search & Filter</h3>
        <div className={styles.filterRow}>
          <input placeholder="Name" onChange={(e) => setItemFilters(prev => ({ ...prev, name: e.target.value }))} />
          <input placeholder="Category" onChange={(e) => setItemFilters(prev => ({ ...prev, category: e.target.value }))} />
          <input placeholder="Brand" onChange={(e) => setItemFilters(prev => ({ ...prev, brand: e.target.value }))} />
        </div>
        <table className={styles.dataTable}>
          <thead>
            <tr><th>Category</th><th>Item Name</th><th>Price</th><th>Brand</th><th>Gender</th></tr>
          </thead>
          <tbody>
            {fakeItems.map(item => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.itemName}</td>
                <td>${item.price}</td>
                <td>{item.brand}</td>
                <td>{item.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Post Filter */}
      <div className={styles.section}>
        <h3>Post Search & Filter</h3>
        <div className={styles.filterRow}>
          <input placeholder="Caption" onChange={(e) => setPostFilters(prev => ({ ...prev, caption: e.target.value }))} />
          <input placeholder="Category" onChange={(e) => setPostFilters(prev => ({ ...prev, category: e.target.value }))} />
        </div>
        <table className={styles.dataTable}>
          <thead>
            <tr><th>Category</th><th>Caption</th><th>Likes</th><th>Comments</th><th>Timestamp</th></tr>
          </thead>
          <tbody>
            {fakePosts.map(post => (
              <tr key={post.id}>
                <td>{post.category}</td>
                <td>{post.caption}</td>
                <td>{post.likes}</td>
                <td>{post.comments}</td>
                <td>{new Date(post.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
