import StatusItem from "./status-item";

interface Status {
  id: string;
  title: string;
  color: string;
}

interface StatusListProps {
  statuses: Status[];
  onEdit: (status: Status) => void;
  onDelete: (id: string) => void;
}

const StatusList = ({ statuses, onEdit, onDelete }: StatusListProps) => {
  return (
    <div className="space-y-3">
      {statuses.map((status) => (
        <StatusItem
          key={status.id}
          status={status}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      {statuses.length === 0 && (
        <div className="py-12 text-center">
          <div className="text-sm text-muted-foreground">
            No statuses created yet. Create your first status to get started.
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusList;
