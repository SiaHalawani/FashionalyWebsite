import React from 'react';
import Sellerstyle from '../../../../../CSS/Sellercss/SellerDashboard.module.css';

const EditProfile = ({ seller, onCancel, onSave }) => {
  // Assuming basic form handling here
  return (
    <div className={Sellerstyle.editProfileContainer}>
      <input type="text" value={seller.fullName} />
      <textarea value={seller.bio} />
      <button onClick={onCancel}>Cancel</button>
      <button onClick={() => onSave(seller)}>Save</button>
    </div>
  );
};

export default EditProfile;
