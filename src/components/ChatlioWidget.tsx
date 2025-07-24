import React, { useEffect } from 'react';

interface ChatlioWidgetProps {
  widgetId: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
    [key: string]: any;
  };
}

const ChatlioWidget: React.FC<ChatlioWidgetProps> = ({ widgetId, user }) => {
  useEffect(() => {
    if (user) {
      const handleChatlioReady = () => {
        if (window._chatlio) {
          window._chatlio.identify(user.id, {
            name: user.name,
            email: user.email,
            ...user
          });
        }
      };

      // Listen for chatlio.ready event
      document.addEventListener('chatlio.ready', handleChatlioReady, false);

      // Cleanup event listener on unmount
      return () => {
        document.removeEventListener('chatlio.ready', handleChatlioReady, false);
      };
    }
  }, [user]);

  return <chatlio-widget widgetid={widgetId}></chatlio-widget>;
};

export default ChatlioWidget;
