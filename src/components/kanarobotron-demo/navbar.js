import React, { useState } from "react";
import AccountMenuModal from "./account-menu-modal";

const NavBar = () => {
  const [isModalShown, toggleModal] = useState(false);
  return (
    <div className="container">
      <div className="logo">
        <p className="logoName">Kanarobo Tron</p>
        <p className="version">v1.0.0</p>
      </div>
      <div className="navTab">
        <ul>
          <li>ホーム</li>
          <li>ロボプロフィール設定</li>
        </ul>
        <div className="profileLogo" onClick={() => toggleModal(!isModalShown)}>
          <i className="fas fa-robot"></i>
        </div>
        {isModalShown && <AccountMenuModal />}
      </div>
      <style jsx>{`
        .container {
          background: #00509b;
          display: flex;
          justify-content: space-between;
          padding: 1rem 2rem;
        }
        .logoName {
          margin: 0;
          color: white;
          font-size: 1.5rem;
        }
        .version {
          margin: 0 0 -0.8rem 0;
          color: white;
          font-size: 0.8rem;
        }
        .navTab {
          display: flex;
        }
        .navTab ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          color: white;
          align-items: center;
        }
        .navTab ul li {
          width: 13rem;
          justify-content: center;
          display: flex;
          font-size: 0.9rem;
        }
        .profileLogo i {
          font-size: 1.2rem;
          background: #e5e5e5;
          border-radius: 20rem;
          padding: 0.55rem 0.4rem 0.57rem 0.4rem;
        }
      `}</style>
    </div>
  );
};

export default NavBar;
