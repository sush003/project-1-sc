import { Settings as SettingsIcon, User, Bell, Shield, Database, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  return (
    <>
      {/* Page Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Configure system preferences</p>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {/* User Preferences */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              User Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Focus Mode Default</p>
                <p className="text-xs text-muted-foreground">Show only critical insights by default</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Compact View</p>
                <p className="text-xs text-muted-foreground">Use condensed decision cards</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Bell className="w-5 h-5 text-muted-foreground" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Critical Alerts</p>
                <p className="text-xs text-muted-foreground">Notify for critical priority decisions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Execution Updates</p>
                <p className="text-xs text-muted-foreground">Notify when executions complete or deviate</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Safety & Control */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Shield className="w-5 h-5 text-muted-foreground" />
              Safety & Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Require Confirmation</p>
                <p className="text-xs text-muted-foreground">Always require explicit confirmation before execution</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Audit Logging</p>
                <p className="text-xs text-muted-foreground">Log all decisions and actions for compliance</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Future Readiness */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              System Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              KORAVO is designed for seamless integration. When ready, connect backend data sources, AI/ML models, and execution systems without UI changes.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-card rounded-lg p-3 text-center">
                <Database className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">Data Sources</span>
              </div>
              <div className="bg-card rounded-lg p-3 text-center">
                <Zap className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">AI/ML Models</span>
              </div>
              <div className="bg-card rounded-lg p-3 text-center">
                <SettingsIcon className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">Execution APIs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
