import { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Button from './button';
import WalletButton from '../walletbutton';
import Oxsis from '../../lib/oxsis.js';

function Navbar({
  navbarContainerStyle = '',
  brandText = '',
  brandTextStyle = '',
  onClick = () => {
    return;
  },
  onClickCreate = () => {
    return;
  },
  address,
  chainId,
}) {
  const [state, setState] = useState({ collectionCount: 0, NFTs: [] });

  const router = useRouter();
  useEffect(() => {
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });

      // If the event is not dispatched by the end of the timeout,
      // the user probably doesn't have MetaMask installed.
      setTimeout(handleEthereum, 3000); // 3 seconds
    }

    async function handleEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        // Access the decentralized web!
        ethereum.request({ method: 'eth_requestAccounts' });
        let oxsis = new Oxsis();
      } else {
        console.log('Please install MetaMask!');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return (
    <div
      className={`navbar d-flex flex-row justify-content-between align-items-center ps-3 py-0 ${navbarContainerStyle}`}
    >
      <style global jsx>{`
        .brand-text {
          font-size: 1.5rem;
        }
        .navbar {
          z-index: 3;
          height: 3.25rem;
          width: calc(100% - 0.55px);
          background-color: #fff;
        }
        .create-button {
          width: 10.9375rem;
          background-color: #fff;
        }
        .oasis-button {
          width: 7.8125rem;
          color: #000;
        }
        .cursor-point {
          cursor: pointer;
        }
      `}</style>
      <span
        onClick={() => router.push('/')}
        className={`brand-text cursor-point h-100 d-flex flex-row align-items-center py-2 ${brandTextStyle}`}
      >
        {brandText}
      </span>
      <div className={`d-none d-sm-flex flex-row`}>
        <WalletButton onPress={onClick} address={address} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  address: state.session.address,
  chainId: state.session.chainId,
});
export default connect(mapStateToProps, {})(Navbar);
