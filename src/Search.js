import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

export default function Weather({ add }) {
  const [buffer, setBuffer] = useState('');

  async function checkAndAdd() {
    const url =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      buffer +
      '&lang=ru&units=metric&appid=5fc73283d7afc0b780eee68e8e3bb82b';
    const response = await fetch(url);
    const data = await response.json();
    var code = data.cod === 200 ? true : false;
    if (code) add(buffer.toLowerCase());
    else {
      alert('"' + buffer + '" - не город');
    }
  }

  return (
    <div>
      <Card className="search-card">
        <CardContent>
          <TextField
            className="text-field"
            id="outlined-basic"
            label="Поиск по городу"
            variant="filled"
            fullWidth
            onChange={(e) => setBuffer(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setBuffer(e.target.value);
                checkAndAdd();
                setBuffer(null);
                e.target.value = '';
              }
            }}
          />
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={() => {
              checkAndAdd();
            }}
          >
            Добавить
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
