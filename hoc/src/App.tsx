import React, {useState} from 'react';

interface DataProps {
  'url'?: string,
  'date': string,
}

interface VideoListProps {
  'list': DataProps[]
}

function DateTime(props: DataProps) {
    return (
        <p className="date">{props.date}</p>
    )
}

function DateTimePretty<P extends DataProps>(Component: React.ComponentType<P>) {
    return function (props: P) {
      const { date } = props;
      const currentDate = new Date();
      const dateValue = new Date(date);
      const diff = currentDate.getTime() - dateValue.getTime();
    
      if (diff < 3600000) {
        const minutesAgo = Math.floor(diff / 60000)
        return <Component {...props} date={`${minutesAgo} минут назад`} />;
      }else if (diff < 86400000) {
        const hoursAgo = Math.floor(diff / 3600000)
        return <Component {...props} date={`${hoursAgo} часов назад`} />;
      }else {
        const daysAgo = Math.floor(diff / 86400000)
        return <Component {...props} date={`${daysAgo} дней назад`} />;
      }
    }
}

function Video(props: DataProps) {
  const DateTimePrettyComponent = DateTimePretty(DateTime);
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen ></iframe>
            <DateTimePrettyComponent date={props.date} />
        </div>
    )
}

function VideoList(props: VideoListProps) {
    return (
      <>
        {props.list.map((item, index) => (
          <Video key={index} url={item.url} date={item.date} />
        ))
        };
      </>
    )
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-11-02 21:13:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}