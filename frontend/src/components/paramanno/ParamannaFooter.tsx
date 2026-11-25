import { Footer7 } from '@/components/ui/footer-7';

interface ParamannaFooterProps {
  onSelectCategory?: (category: string) => void;
}

export default function ParamannaFooter({ onSelectCategory }: ParamannaFooterProps) {
  const handleLinkClick = (href: string) => {
    if (href === '#provisions') {
      onSelectCategory?.('All');
    }
  };

  return (
    <Footer7
      brandTitle="Paramanna"
      brandHref="/paramanno"
      links={[
        { name: 'Pantry', href: '#provisions' },
        { name: 'Heritage', href: '#heritage' },
        { name: 'Teas', href: '/tea' },
        { name: 'Coffees', href: '/coffees' },
      ]}
      copyright={`© ${new Date().getFullYear()} Paramanna Organic Foods`}
      onLinkClick={handleLinkClick}
    />
  );
}
