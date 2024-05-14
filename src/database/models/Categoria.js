module.exports = (sequelize, DataTypes) => {
    let alias = "Categoria";
    let cols  = {
        id: {type:DataTypes.BIGINT(10).UNSIGNED, 
            primaryKey: true, 
            allowNull: false,
            autoIncrement:true
            },

        name: { type: DataTypes.STRING(100),
                allowNull: false
            }

}
    let config = {
        timestamps: true,
        createdAt:  'created_at',
        updatedAt: 'updated_at',
        deletesAt: false
    }

    const Categoria = sequelize.define(alias,cols,config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Producto,{
            as: "Producto",
            foreignKey:'categoria_id'
        });
}
    return Categoria;
}