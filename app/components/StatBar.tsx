type StatBarProps = {
  label: string;
  value: number; // 0-100
};

export default function StatBar({ label, value }: StatBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-900">{label}</span>
        <span className="text-purple-600 font-semibold">{value}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
