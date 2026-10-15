'use client';

import { useState } from 'react';
import { ArrowRight, Check, Coffee, Gavel, Search, ShoppingBag, Bell, SlidersHorizontal } from 'lucide-react';

const journeys = {
  auction: [
    { label: 'Discover', title: 'Find the right auction', description: 'Search and filter listings to find an item.', icon: Search, detail: ['Search listings', 'Filter results', 'Explore item details'] },
    { label: 'Bid', title: 'Make your next move', description: 'An authenticated bidding flow connects buyers with auctions.', icon: Gavel, detail: ['Sign in securely', 'Review the listing', 'Place a bid'] },
    { label: 'Stay updated', title: 'Keep track of the action', description: 'Automated notifications keep bidders informed.', icon: Bell, detail: ['Follow your auction', 'Receive updates', 'Review bidding activity'] },
  ],
  cafe: [
    { label: 'Browse', title: 'Start with the menu', description: 'Move through the menu to explore available items.', icon: Coffee, detail: ['Browse the menu', 'Choose an item', 'View your selection'] },
    { label: 'Customize', title: 'Make it your order', description: 'Adjust quantities before adding your selection to the cart.', icon: SlidersHorizontal, detail: ['Choose your items', 'Adjust quantities', 'Add to cart'] },
    { label: 'Cart', title: 'Everything in one place', description: 'Dynamic cart updates keep your selections together across screens.', icon: ShoppingBag, detail: ['Review items', 'Update quantities', 'Manage your cart'] },
  ],
};

export default function ProjectWalkthrough({ kind }: { kind: keyof typeof journeys }) {
  const [active, setActive] = useState(0);
  const steps = journeys[kind];
  const step = steps[active];
  const Icon = step.icon;
  return <section className="project-walkthrough" aria-label="Illustrative project walkthrough">
    <div className="walkthrough-caption"><span className="studio-eyebrow">EXPLORE THE FLOW</span><span>Illustrative preview · not the live application</span></div>
    <div className="walkthrough-steps">{steps.map((item,index) => <button key={item.label} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>{index < active ? <Check size={12}/> : `0${index+1}`}</span>{item.label}</button>)}</div>
    <div key={active} className="walkthrough-stage visual-swap" aria-live="polite"><div className="walkthrough-icon"><Icon size={38} strokeWidth={1.3}/></div><div><h3>{step.title}</h3><p>{step.description}</p></div><div className="walkthrough-actions">{step.detail.map((item,index) => <span key={item}><i>{index+1}</i>{item}</span>)}</div></div>
    <button type="button" className="studio-project-link" onClick={() => setActive((active+1)%steps.length)}>{active === steps.length-1 ? 'Explore again' : 'Next step'}<ArrowRight size={16}/></button>
  </section>;
}
