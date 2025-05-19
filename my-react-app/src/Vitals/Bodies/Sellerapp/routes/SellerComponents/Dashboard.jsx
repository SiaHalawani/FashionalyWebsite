import React, { useState, useEffect } from 'react';
import { useSellerState } from '../../../../../BackendIntegration/SellerData/SellerDataManagement';
import { getClickSummary, getExplorePosts, getSellerFull } from '../../../../../BackendIntegration/AxiosConnections/UserGetConnections/SellerInsight';

import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

export default function Dashboard() {
  const { sellerProfile, sellerComponents, sellerPosts } = useSellerState();
  const stats = sellerProfile?.stats || {};
  const adBudget = sellerProfile?.adBudget || {};
  const [fullData, setFullData] = useState(null);
const [clickSummaries, setClickSummaries] = useState([]);
const [explorePosts, setExplorePosts] = useState([]);


  const totalItems = sellerComponents?.reduce((acc, link) => acc + (link.items?.length || 0), 0) || 0;
  const totalPosts = sellerPosts?.reduce((acc, link) => acc + (link.items?.length || 0), 0) || 0;

  const [itemFilters, setItemFilters] = useState({
    name: '',
    category: '',
    brand: '',
    gender: 'all',
    minPrice: '',
    maxPrice: ''
  });

  const [postFilters, setPostFilters] = useState({
    caption: '',
    category: '',
    minLikes: '',
    maxLikes: '',
    minComments: '',
    maxComments: '',
    dateFrom: '',
    dateTo: ''
  });

  const filteredItems = sellerComponents.flatMap(group =>
    group.items
      .filter(item =>
        (!itemFilters.name || item.itemName.toLowerCase().includes(itemFilters.name.toLowerCase())) &&
        (!itemFilters.category || group.title.toLowerCase().includes(itemFilters.category.toLowerCase())) &&
        (!itemFilters.brand || item.brand.toLowerCase().includes(itemFilters.brand.toLowerCase())) &&
        (itemFilters.gender === 'all' || item.gender === itemFilters.gender) &&
        (!itemFilters.minPrice || item.price >= parseFloat(itemFilters.minPrice)) &&
        (!itemFilters.maxPrice || item.price <= parseFloat(itemFilters.maxPrice))
      )
      .map(item => ({ ...item, category: group.title }))
  );

  const filteredPosts = sellerPosts.flatMap(group =>
    group.posts
      .filter(post => {
        const date = new Date(post.timestamp);
        return (
          (!postFilters.caption || post.caption.toLowerCase().includes(postFilters.caption.toLowerCase())) &&
          (!postFilters.category || group.title.toLowerCase().includes(postFilters.category.toLowerCase())) &&
          (!postFilters.minLikes || post.likes >= parseInt(postFilters.minLikes)) &&
          (!postFilters.maxLikes || post.likes <= parseInt(postFilters.maxLikes)) &&
          (!postFilters.minComments || post.comments >= parseInt(postFilters.minComments)) &&
          (!postFilters.maxComments || post.comments <= parseInt(postFilters.maxComments)) &&
          (!postFilters.dateFrom || date >= new Date(postFilters.dateFrom)) &&
          (!postFilters.dateTo || date <= new Date(postFilters.dateTo))
        );
      })
      .map(post => ({ ...post, category: group.title }))
  );
const barData = {
  labels: ['Tops', 'Bottoms', 'Shoes', 'Accessories', 'Outerwear'],
  datasets: [
    {
      label: 'Items Per Category',
      data: [22, 14, 9, 7, 5], // dummy counts
      backgroundColor: 'rgba(0, 255, 204, 0.5)',
      borderColor: 'rgba(0, 255, 204, 1)',
      borderWidth: 1
    }
  ]
};
// 👇 insert this helper ABOVE return
function distributeAdSpend(spent = 0) {
  const percentages = [10, 25, 15, 5, 20, 15, 10]; // Mon → Sun
  const total = percentages.reduce((a, b) => a + b, 0);
  const normalized = percentages.map(p => p / total); // turn into proportions

  // Convert each portion into dollars, round to 2 decimal places
  return normalized.map(p =>
    parseFloat((Math.floor((spent * p) * 100 / 5) * 5 / 100).toFixed(2)) // ensure it's a multiple of $0.05
  );
}
const weeklyAdSpend = distributeAdSpend(adBudget.spent || 230); // example fallback

const lineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Ad Spend This Week ($)',
      data: weeklyAdSpend,
      fill: true,
      borderColor: 'rgba(255, 205, 86, 1)',
      backgroundColor: 'rgba(255, 205, 86, 0.15)',
      pointRadius: 4,
      tension: 0.3
    }
  ]
};




  const pieData = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [
          adBudget.spent || 0,
          (adBudget.currentBudget || 0) - (adBudget.spent || 0)
        ],
        backgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };
  const clickBar = {
    labels: clickSummaries.map((_, i) => `Post ${i + 1}`),
    datasets: [{
      label: 'Clicks per Post',
      data: clickSummaries.map(entry => entry?.clicks || 0),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  };
  
  const exploreRelevance = {
    labels: explorePosts.map((_, i) => `Post ${i + 1}`),
    datasets: [{
      label: 'Relevance Score',
      data: explorePosts.map(post => post?.relevanceScore || 0),
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
    }]
  };
  
  useEffect(() => {
    const fetchInsights = async () => {
      if (!sellerProfile?.sellerId) return;
      const full = await getSellerFull(sellerProfile.sellerId);
      setFullData(full);
      const posts = full?.sellerPosts?.flatMap(group => group.posts || []) || [];
      const clicks = await Promise.all(
        posts.map(post => getClickSummary(post["id "]?.trim?.() || post.id, full.sellerId))
      );
      setClickSummaries(clicks);
      const explore = await getExplorePosts(full.sellerId);
      setExplorePosts(explore);
    };
    fetchInsights();
  }, [sellerProfile]);
  
const clickSummariess = [
  { postId: 'post001', clicks: 145 },
  { postId: 'post002', clicks: 87 },
  { postId: 'post003', clicks: 203 },
  { postId: 'post004', clicks: 64 },
  { postId: 'post005', clicks: 119 }
];

const fullDatas = {
  sellerPosts: [
    {
      id: 'group1',
      posts: [
        { id: 'post001', caption: 'New summer collection' },
        { id: 'post002', caption: 'Flash sale alert!' },
        { id: 'post003', caption: 'Behind the scenes shoot' },
        { id: 'post004', caption: 'Customer testimonials' },
        { id: 'post005', caption: 'Product feature: Denim' }
      ]
    }
  ]
};
  return (
    <div style={{ padding: '20px' }}>
      <h2>Dynamic Seller Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <h3>Performance (Bar)</h3>
          <Bar data={barData} />
        </div>
        <div style={{ width: '30%' }}>
          <h3>Engagement (Line)</h3>
          <Line data={lineData} />
        </div>
        <div style={{ width: '30%' }}>
          <h3>Ad Budget (Pie)</h3>
          <Pie data={pieData} />
        </div>
      </div>
  
      <div style={{ marginTop: '20px' }}>
        <h3>Date Reference</h3>
        <DatePicker selected={new Date()} readOnly />
      </div>
  
      <div style={{ marginTop: '40px' }}>
        <h3>Item Search & Filter</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
          <input placeholder="Name" onChange={(e) => setItemFilters(prev => ({ ...prev, name: e.target.value }))} />
          <input placeholder="Category" onChange={(e) => setItemFilters(prev => ({ ...prev, category: e.target.value }))} />
          <input placeholder="Brand" onChange={(e) => setItemFilters(prev => ({ ...prev, brand: e.target.value }))} />
          <input placeholder="Min Price" type="number" onChange={(e) => setItemFilters(prev => ({ ...prev, minPrice: e.target.value }))} />
          <input placeholder="Max Price" type="number" onChange={(e) => setItemFilters(prev => ({ ...prev, maxPrice: e.target.value }))} />
          <select onChange={(e) => setItemFilters(prev => ({ ...prev, gender: e.target.value }))}>
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
  
        <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th>Category</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
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
  
      <div style={{ marginTop: '40px' }}>
        <h3>Post Search & Filter</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
          <input placeholder="Caption" onChange={(e) => setPostFilters(prev => ({ ...prev, caption: e.target.value }))} />
          <input placeholder="Category" onChange={(e) => setPostFilters(prev => ({ ...prev, category: e.target.value }))} />
          <input placeholder="Min Likes" type="number" onChange={(e) => setPostFilters(prev => ({ ...prev, minLikes: e.target.value }))} />
          <input placeholder="Max Likes" type="number" onChange={(e) => setPostFilters(prev => ({ ...prev, maxLikes: e.target.value }))} />
          <input placeholder="Min Comments" type="number" onChange={(e) => setPostFilters(prev => ({ ...prev, minComments: e.target.value }))} />
          <input placeholder="Max Comments" type="number" onChange={(e) => setPostFilters(prev => ({ ...prev, maxComments: e.target.value }))} />
          <input type="date" onChange={(e) => setPostFilters(prev => ({ ...prev, dateFrom: e.target.value }))} />
          <input type="date" onChange={(e) => setPostFilters(prev => ({ ...prev, dateTo: e.target.value }))} />
        </div>
  
        <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th>Category</th>
              <th>Caption</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr key={post.id}>
                <td>{post.category}</td>
                <td>{post.caption}</td>
                <td>{post.likes}</td>
                <td>{post.comments}</td>
                <td>{new Date(post.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{/*   
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '45%' }}>
          <h4>Click Summary</h4>
          <Bar data={clickBar} />
        </div>
        <div style={{ width: '45%' }}>
          <h4>Explore Relevance Scores</h4>
          <Bar data={exploreRelevance} />
        </div>
      </div> */}
  
      <div style={{ marginTop: '40px' }}>
        <h4>Click Insights Table</h4>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginTop: '20px' }}>
  <thead>
    <tr style={{ backgroundColor: 'var(--background-color-box)', color: 'var(--text-titles)' }}>
      <th style={{ padding: '10px', border: '1px solid var(--background-color-secondary)' }}>Post ID</th>
      <th style={{ padding: '10px', border: '1px solid var(--background-color-secondary)' }}>Caption</th>
      <th style={{ padding: '10px', border: '1px solid var(--background-color-secondary)' }}>Clicks</th>
    </tr>
  </thead>
  <tbody>
    {fullDatas.sellerPosts[0].posts.map((post, idx) => {
      const match = clickSummariess.find(c => c.postId === post.id);
      return (
        <tr
          key={post.id}
          style={{
            backgroundColor: idx % 2 === 0 ? 'var(--background-color)' : 'var(--background-color-secondary)',
            color: 'var(--text-box)'
          }}
        >
          <td style={{ padding: '10px', border: '1px solid var(--background-color-secondary)' }}>{post.id}</td>
          <td style={{ padding: '10px', border: '1px solid var(--background-color-secondary)' }}>{post.caption}</td>
          <td style={{ padding: '10px', border: '1px solid var(--background-color-secondary)' }}>{match?.clicks || 0}</td>
        </tr>
      );
    })}
  </tbody>
</table>

      </div>
    </div>
  );
  
}
