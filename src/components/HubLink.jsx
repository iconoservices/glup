import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';

// Pequeño enlace de vuelta al hub de apps.
export default function HubLink() {
  return (
    <Link to="/" className="hub-link">
      <LayoutGrid size={13} /> Boga Hub
    </Link>
  );
}
