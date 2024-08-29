import type { Chain } from 'viem';

export const mantaTestnet = {
  id: 656476,
  name: 'Open Campus Codex',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.open-campus-codex.gelato.digital']
    }
  },
  testnet: true,
  blockExplorers: {
    default: {
      name: 'Open Campus Codex',
      url: 'https://opencampus-codex.blockscout.com'
    }
  },
  contracts: {
    launchapToken: {
      address: '0x8d3b53f80DaCa5EBe21dFD0ec974d2951be4ECBA'
    },
    launchpad: {
      address: '0xF67b9e899A9B8f1Ea66E27AB6B7AEF9f05844CCC'
    },
    stakingToken: {
      address: '0x3d416A9fa13A84b984C16d52Fb005FC26892ED10'
    },
    aridropToken: {
      address: '0x4DeAf2E4eCbAEafff5E6243DBd11b5737bc7084A'
    }
  }
} as const satisfies Chain;
