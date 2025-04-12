export const getPermissions = (role: "ADMIN" | "EDITOR" | "VIEWER" | "CREATOR") => {
    let permission = {
      vehicle: {
        read: true,
        write: false,
        update: false,
        delete: false,
      },
      trip: {
        read: true,
        write: false,
        update: false,
        delete: false,
      },
      driver: {
        read: true,
        write: false,
        update: false,
        delete: false,
      },
      customer: {
        read: true,
        write: false,
        update: false,
        delete: false,
      },
      expense: {
        read: true,
        write: false,
        update: false,
        delete: false,
      },
      user: {
        read: false,
        write: false,
        update: false,
        delete: false,
      },
    };
  
    if (role === "ADMIN") {
      permission = {
        vehicle: {
          read: true,
          write: true,
          update: true,
          delete: true,
        },
        trip: {
          read: true,
          write: true,
          update: true,
          delete: true,
        },
        driver: {
          read: true,
          write: true,
          update: true,
          delete: true,
        },
        customer: {
          read: true,
          write: true,
          update: true,
          delete: true,
        },
        expense: {
          read: true,
          write: true,
          update: true,
          delete: true,
        },
        user: {
          read: true,
          write: true,
          update: true,
          delete: true,
        },
      };
    }
  
    if (role === "EDITOR") {
      permission = {
        vehicle: {
          read: true,
          write: true,
          update: true,
          delete: false,
        },
        trip: {
          read: true,
          write: true,
          update: true,
          delete: false,
        },
        driver: {
          read: true,
          write: true,
          update: true,
          delete: false,
        },
        customer: {
          read: true,
          write: true,
          update: true,
          delete: false,
        },
        expense: {
          read: true,
          write: true,
          update: true,
          delete: false,
        },
        user: {
          read: false,
          write: false,
          update: false,
          delete: false,
        },
      };
    }

    if(role === 'CREATOR'){
      permission = {
        vehicle: {
          read: true,
          write: true,
          update: false,
          delete: false,
        },
        trip: {
          read: true,
          write: true,
          update: false,
          delete: false,
        },
        driver: {
          read: true,
          write: true,
          update: false,
          delete: false,
        },
        customer: {
          read: true,
          write: true,
          update: false,
          delete: false,
        },
        expense: {
          read: true,
          write: true,
          update: false,
          delete: false,
        },
        user: {
          read: false,
          write: false,
          update: false,
          delete: false,
        },
      };
    }
  
    return permission;
  };