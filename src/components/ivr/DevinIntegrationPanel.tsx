
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useDevinIntegration } from '@/hooks/useDevinIntegration';
import { Settings, Wifi, WifiOff, RefreshCw } from 'lucide-react';

const DevinIntegrationPanel: React.FC = () => {
  const { devinSession, connectToDevin, disconnectFromDevin } = useDevinIntegration();
  const [devinEndpoint, setDevinEndpoint] = useState('https://your-devin-endpoint.com');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const result = await connectToDevin(devinEndpoint);
      if (!result.success) {
        console.error('Failed to connect to Devin:', result.error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const getStatusBadge = () => {
    if (!devinSession) return <Badge variant="secondary">Not Connected</Badge>;
    
    switch (devinSession.status) {
      case 'connecting':
        return <Badge className="bg-yellow-500">Connecting...</Badge>;
      case 'connected':
        return <Badge className="bg-green-500">Connected</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      case 'disconnected':
        return <Badge variant="secondary">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card className="bg-[#081a2e]/80 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#ff914d]" />
          Devin AI Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Status:</span>
          {getStatusBadge()}
        </div>
        
        {devinSession?.lastSync && (
          <div className="flex items-center justify-between">
            <span className="text-sm">Last Sync:</span>
            <span className="text-xs text-white/70">
              {devinSession.lastSync.toLocaleTimeString()}
            </span>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Devin Endpoint:</label>
          <Input
            value={devinEndpoint}
            onChange={(e) => setDevinEndpoint(e.target.value)}
            placeholder="https://your-devin-endpoint.com"
            className="bg-white/10 border-white/20 text-white"
            disabled={devinSession?.status === 'connected'}
          />
        </div>

        <div className="flex gap-2">
          {!devinSession || devinSession.status === 'disconnected' ? (
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="bg-[#0d4dcc] hover:bg-[#0d4dcc]/90 text-white flex items-center gap-2"
            >
              {isConnecting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Wifi className="w-4 h-4" />
              )}
              {isConnecting ? 'Connecting...' : 'Connect to Devin'}
            </Button>
          ) : (
            <Button
              onClick={disconnectFromDevin}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 flex items-center gap-2"
            >
              <WifiOff className="w-4 h-4" />
              Disconnect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DevinIntegrationPanel;
