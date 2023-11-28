const ProductManagerView = () => {
    return (
        <div>
            <div className={'flex flex-col gap-4 items-center justify-center m-3'}>
                <div className="stats shadow">
                    <div className="stat place-items-center">
                        <div className="stat-title">USERS</div>
                        <div className="stat-value text-app-200">31K</div>
                        <div className="stat-desc">Total Users</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>company</th>
                            <th>location</th>
                            <th>Last Login</th>
                            <th>Favorite Color</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>Canada</td>
                            <td>12/16/2020</td>
                            <td>Blue</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductManagerView;
