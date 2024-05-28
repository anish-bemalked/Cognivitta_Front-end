import axios from "axios";
import React, { useEffect, useState, useContext, useRef } from "react";
import { Table, Form, Input } from "antd";
import { Row, Col, Statistic } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const fetchLTP = async (instrument_token) => {
  const config = {
    method: "post",
    url: "http://localhost:8080/v1/ltp",
    data: {
      token: localStorage.getItem("token"),
      instrument_token: instrument_token,
    },
  };
  const response = await axios(config);
  const ltp = response.data.last_price;
  return ltp;
};

const editLabel = async (row) => {
  const config = {
    method: "post",
    url: "http://localhost:8080/v1/holdings/editLabel",
    data: row,
  };
  const response = await axios(config);
};

const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const getBackgroundColors = (length) => {
  var backgroundColors = [];

  for (var i = 0; i < length; i++) {
    backgroundColors.push(generateRandomColor());
  }

  return backgroundColors;
};

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export default function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [dyLabels, setDyLabels] = useState([]);
  const [filteredPnL, setFilteredPnL] = useState(null);
  const [filteredReturn, setFilteredReturn] = useState(null);
  const [netInvestedAmount, setNetInvestedAmount] = useState(null);
  const [netCurrentValue, setNetCurrentValue] = useState(null);
  const [userData, setUserData] = useState([]);
  const data = [];

  const handleSave = (row) => {
    const newData = [...holdings];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setHoldings(newData);
    editLabel(row);
    window.location.reload();
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const fetchHoldings = async () => {
    const config = {
      method: "post",
      url: "http://localhost:8080/v1/holdings",
      data: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios(config);
    let NLables = new Set();
    for (const obj of response.data) {
      const {
        instrument_token,
        tradingsymbol,
        quantity,
        average_price,
        t1_quantity,
        label,
      } = obj;
      const ltp = await fetchLTP(instrument_token);
      const pnl = ((ltp - average_price) * (quantity + t1_quantity)).toFixed(2);
      const updatedHolding = {
        instrument_token: instrument_token,
        tradingsymbol: tradingsymbol,
        quantity: quantity,
        t1_quantity: t1_quantity,
        average_price: average_price,
        ltp: ltp,
        pnl: parseFloat(pnl),
        return: (
          (pnl * 100) /
          ((quantity + t1_quantity) * average_price)
        ).toFixed(2),
        label: label,
      };
      data.push(updatedHolding);
      NLables.add(label);
    }
    setHoldings(data);
    setDyLabels([...NLables]);
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  useEffect(() => {
    calculateFilteredData(holdings);
  }, [holdings]);

  const calculateFilteredData = (filteredData) => {
    const netPnL = filteredData.reduce((acc, curr) => acc + curr.pnl, 0);
    setFilteredPnL(netPnL.toFixed(2));

    const netInvestment = filteredData.reduce(
      (acc, curr) =>
        acc + curr.average_price * (curr.quantity + curr.t1_quantity),
      0
    );
    const netCurrentValue = filteredData.reduce(
      (acc, curr) => acc + curr.ltp * (curr.quantity + curr.t1_quantity),
      0
    );

    const netReturn = (
      ((netCurrentValue - netInvestment) / netInvestment) *
      100
    ).toFixed(2);
    setFilteredReturn(netReturn);

    setNetInvestedAmount(netInvestment.toFixed(2));
    setNetCurrentValue(netCurrentValue.toFixed(2));

    const labels = filteredData.map((data) => data.tradingsymbol);
    const datasets = [
      {
        label: "Current Value",
        data: filteredData.map(
          (data) => (data.quantity + data.t1_quantity) * data.ltp
        ),
        backgroundColor: getBackgroundColors(filteredData.length),
      },
    ];

    setUserData({ labels, datasets });
  };

  const defaultColumns = [
    {
      title: "Instrument",
      dataIndex: "tradingsymbol",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "T1 Quantity",
      dataIndex: "t1_quantity",
    },
    {
      title: "Avg. Price",
      dataIndex: "average_price",
    },
    {
      title: "LTP",
      dataIndex: "ltp",
    },
    {
      title: "PnL",
      dataIndex: "pnl",
      render: (text) => (
        <span style={{ color: text >= 0 ? "green" : "red" }}>{text}</span>
      ),
    },
    {
      title: "Return",
      dataIndex: "return",
      render: (text) => (
        <span style={{ color: text >= 0 ? "green" : "red" }}>{text}%</span>
      ),
    },
    {
      title: "Label",
      dataIndex: "label",
      editable: true,
      filters: dyLabels.map((i) => ({ text: i, value: i })),
      onFilter: (value, record) => record.label.indexOf(value) === 0,
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    calculateFilteredData(extra.currentDataSource);
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
        },
      },
    },
  };

  return (
    <>
      <h1
        style={{
          textShadow: "none",
          fontFamily: "Montserrat",
          paddingBottom: "10px",
        }}
      >
        Holdings
      </h1>
      <Row gutter={16}>
        <Col span={18} style={{ marginLeft: "0px" }}>
          <Table
            components={components}
            columns={columns}
            dataSource={holdings}
            onChange={onChange}
            rowClassName={() => "editable-row"}
            showSorterTooltip={{
              target: "sorter-icon",
            }}
            style={{ padding: "0 20px" }}
          />
        </Col>
        <Col span={6}>
          {filteredPnL !== null && (
            <div>
              <Row gutter={16}>
                <Col span={12} style={{ paddingBottom: "20px" }}>
                  <Statistic
                    title="PnL"
                    value={filteredPnL ?? 0}
                    valueStyle={{
                      color: filteredPnL >= 0 ? "green" : "red",
                    }}
                  />
                </Col>
                <Col span={12} style={{ paddingBottom: "20px" }}>
                  <Statistic
                    title="Return"
                    value={`${filteredReturn ?? 0}%`}
                    valueStyle={{
                      color: filteredReturn >= 0 ? "green" : "red",
                    }}
                  />
                </Col>
                <Col span={12} style={{ paddingBottom: "20px" }}>
                  <Statistic
                    title="Net Invested Amount"
                    value={netInvestedAmount ?? 0}
                  />
                </Col>
                <Col span={12} style={{ paddingBottom: "20px" }}>
                  <Statistic
                    title="Net Current Value"
                    value={netCurrentValue ?? 0}
                  />
                </Col>
                <Col>
                  <div style={{ marginLeft: "27px", marginTop: "25px" }}>
                    <Pie data={userData} options={options} />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}
