import "./FilterSession.css";

export const FilterSession = ({
  searchTerm,
  setSearchTerm,
  weaponTypes,
  selectedWeaponType,
  setSelectedWeaponType,
}) => {
  return (
    <div className="filter-session">
      <input
        type="text"
        placeholder="Search sessions by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "1em" }}
      />
      <select
        value={selectedWeaponType}
        onChange={(e) => setSelectedWeaponType(e.target.value)}
      >
        <option value="">All Weapon Types</option>
        {weaponTypes.map((weapon) => (
          <option key={weapon.id} value={weapon.id}>
            {weapon.name}
          </option>
        ))}
      </select>
    </div>
  );
};
