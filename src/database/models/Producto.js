module.exports = (sequelize, DataTypes) => {
    let alias = "Producto";
    let cols  = {
        id: {type:DataTypes.BIGINT(10).UNSIGNED, 
            primaryKey: true, 
            allowNull: false,
            autoIncrement:true
            },

        title: { type: DataTypes.STRING(50),
                allowNull: false
            },

        price: { type: DataTypes.BIGINT(10),
                allowNull: true
            },
        
        discount: { type: DataTypes.STRING(15),
                allowNull: true
            },
        
        detail: { type: DataTypes.TEXT,
                allowNull: true
            },

        categoria_id: {type: DataTypes.BIGINT(10).UNSIGNED}

}
    let config = {
        timestamps: true,
        createdAt:  'created_at',
        updatedAt: 'updated_at',
        deletesAt: false
    }

    const Producto = sequelize.define(alias,cols,config);

    Producto.associate = function(models){
        Producto.belongsTo(models.Categoria,{
            as: "categoria",
            foreignKey:'categoria_id'
        });
}
    return Producto;
}