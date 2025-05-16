import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/getAdBySellerIdAndPostId';
import { getSellerFull } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/getSellerById';
import styles from '../../../CSS/AdLinkPage.module.css';

export default function AdLinkPage() {
  const { sellerId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const [postData, sellerData] = await Promise.all([
          getPostById(sellerId, postId),
          getSellerFull(sellerId)
        ]);
        setPost(postData);
        setSeller(sellerData);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchAdData();
  }, [sellerId, postId]);

  return (
    <div className={styles.adContainer}>
      <div className={styles.adBox}>
     
        {post ? (
          <div className={styles.splitLayout}>
            <div className={styles.leftPanel}>
                 <button className={styles.backBtn} onClick={() => navigate(-1)}>← Go Back</button>
        <h1 className={styles.header}> {seller?.SellerBrandName}</h1>

              <img src={post.image} alt="Ad" className={styles.postImage} />
              <p className={styles.username}>@{seller?.SellerBrandName}</p>
            </div>

            <div className={styles.rightPanel}>
              
              <h3>Sponsored Ad</h3>
              
              <div className={styles.infoBox}>
                
                <p><strong>Posted:</strong> {new Date(post.timestamp).toLocaleDateString()}</p>
                
              </div>
               <h4>Caption</h4>
                    <div className={styles.infoBox}>
              <h2 className={styles.caption}>{post.caption}</h2>
              </div>
              <div className={styles.meta}>
               
              </div>


              <div className={styles.sellerBox}>
                <h3>Seller Info</h3>
                 <p><strong>Brand:</strong> {seller?.SellerBrandName}</p>
                {/* <p><strong>Name:</strong> {seller?.SellerName}</p> */}
                 <p><strong>Email:</strong> {seller?.SellerEmail}</p>
                <p><strong>Phone:</strong> {seller?.Sellerphone}</p>
                <p><strong>Instagram:</strong> {seller?.SellerInstagram}</p>
                <p><strong>Website:</strong> {seller?.Sellerwebsite}</p> 
                <p><strong>Verified:</strong> {seller?.verified ? 'Yes' : 'No'}</p>
                {/* <p><strong>Joined:</strong> {new Date(seller?.joined).toLocaleDateString()}</p> */}

                <div className={styles.stats}>
                  <p><strong>Rating:</strong> {seller?.stats?.rating}</p>
                </div>

                <button onClick={() => navigate(`/Fashop/Seller/${seller?.SellerBrandName}`)}>
                  View More from Seller
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading post data...</p>
        )}
      </div>
    </div>
  );
}
