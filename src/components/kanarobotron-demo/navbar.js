import React, { useState } from "react";
import AccountMenuModal from "./account-menu-modal";

const NavBar = () => {
  const [isModalShown, toggleModal] = useState(false);
  return (
    <div>
      <div>
        <h1>Kanarobo Tron</h1>
        <p>v1.0.0</p>
      </div>
      <ul>
        <li>ホーム</li>
        <li>ロボプロフィール設定</li>
      </ul>
      <div onClick={() => toggleModal(!isModalShown)}>
        <i className="fas fa-robot"></i>
      </div>
      {isModalShown && <AccountMenuModal />}
    </div>
  );
};

export default NavBar;
