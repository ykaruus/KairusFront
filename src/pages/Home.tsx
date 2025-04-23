import React, { Suspense, use, useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Fab, Grid, CardActions, IconButton, Tooltip, Chip, Stack, CircularProgress, Snackbar, Alert, useTheme, useMediaQuery, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import logo from "../assets/logoTop.png"
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AlertForm from '../components/FormScheduled';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList'
import { getAllStudents } from '../services/getAllStudents';
import { sendScheduled } from '../services/sendStudent';
// import { Error } from '@mui/icons-material/';
import { updateStudentById } from '../services/editStudent';
import FilterDialog from '../components/filterDialog';
import FilterChip from '../components/filterButton';
import AlertDialog from '../components/Confirm';
import { deleteScheduled } from '../services/deleteStudent';
import LongMenu from '../components/Menu';
import MenuExemplo from '../components/Menu';
import CustomMenu from '../components/Menu';
import InfoDialog from '../components/InfoDialog';
// Removed invalid EyeIcon import


const ModalityFormat = (index: any) => {
  const ModalityArray: string[] = ["vôlei de quadra", "Basquete", "vôlei de areia", "Musculacao", "Muay Thai"];

  if (!ModalityArray[index]) {
    return "Modalidade Desconhecida"
  } else {
    return ModalityArray[index];
  }
}
const LocalFormat = (index: any) => {
  const LocalArray: string[] = ["Circulo Militar", "Adventista", "Clube Dos Sargentos", "Esplay Academia"];

  if (!LocalArray[index]) {
    return "Modalidade Desconhecida"
  } else {
    return LocalArray[index];
  }
}
const formatTimeScheduled = (timeScheduled: string) => {
  const [date, time] = timeScheduled.split(" ");


  return { date: date, time: time };
}

const StateArray = {
  0: { label: "Reagendou", color: "error" },
  1: { label: "Vai fazer matrícula", color: "secondary" },
  2: { label: "Fez matrícula", color: "success" },
  3: { label: "Vai pensar", color: "info" },
  4: { label: "Fez aula", color: "primary" },
  5: { label: "Aula experimental agendada", color: "warning" }
};



const formatState = (index: keyof typeof StateArray) => {



  return StateArray[index] || { label: "Status desconhecido", color: "default" };;
}

const CardsList = ({ modality, horario, date, name, local, status_name, status, handlers, userId }: { modality: string, horario: string, date: string, name: string, local: string, status_name: string, status: string, handlers: any, userId: string }) => {
  return <Grid gridTemplateColumns={{
    xs: '1fr',
    sm: '1fr 1fr',
    md: '1fr 1fr 1fr'
  }}>
    <Card sx={{ backgroundColor: "#1c1c1c", color: "#fff", minHeight: 200, minWidth: 300 }}>
      <CardContent>
        <Box height={"100%"}>
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
        </Box>
        <Stack spacing={0.5}>
          <Typography variant="body2">Local: {local}</Typography>
          <Typography variant="body2">Modalidade: {modality}</Typography>
          <Typography variant="body2">Horário: {horario}</Typography>
          <Typography variant="body2">Data: {date}</Typography>
          <Typography variant="body2" component={"div"}>Status: <Chip label={status_name} color={status as "error" | "success" | "warning" | "info" | "default" | "primary" | "secondary"} size="small"  ></Chip></Typography>
          <Typography variant='body2' component={"div"}>
            ID: <Typography variant="body2" color="textSecondary" component="span">
              {userId}
            </Typography>
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          {/* Grupo da esquerda */}
          <Box>
            <Tooltip title="Ver Agendamento">
              <IconButton color="secondary" onClick={() => handlers.handlerSee(userId)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Editar Agendamento">
              <IconButton onClick={() => handlers.edit(name)} color="warning">
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Deletar Agendamento">
              <IconButton onClick={() => handlers.handlerDelete(userId, name)} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Botão da direita */}
          <Box sx={{ marginLeft: 'auto' }}>
            <Tooltip title="Copiar mensagem de agendamento">
            {/* local: string, name: string, modality: string, time : string */}
              <IconButton onClick={() => handlers.handlerCopy(local, name, modality, horario, userId, date)} color="primary">
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardActions>
    </Card>
  </Grid>

}



const HomeScreen = () => {


  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState<"error" | "success" | "warning" | "info">("success");
  const [message, setMessage] = useState("success");
  const [refreshScheduled, setRefreshScheduled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({
    age: 0,
    local: 0,
    modality: 0,
    name: "",
    phoneNumber: "",
    state: 0,
    dateScheduled: "",
    timeScheduled: "",
    userId: ""
  });
  const [formData, setFormData] = useState({
    age: 0,
    local: 0,
    modality: 0,
    name: "",
    phoneNumber: "",
    state: 0,
    dateScheduled: "",
    timeScheduled: ""
  });

  const [filtros, setFiltros] = useState({
    name: "",
    phoneNumber: "",
    dateScheduled: "",
    timeScheduled: "",
    userId: ""
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(false);
  const [alertDialog, setAlertDialog] = useState<{
    open: boolean;
    title: string;
    text: string;
    btn_cancel_text: string;
    btn_confirm_text: string;
    onConfirm: () => void
  }>({
    open: false,
    title: "",
    text: "",
    btn_cancel_text: "",
    btn_confirm_text: "",
    onConfirm: () => { }
  });
  const [userId, setUserId] = useState("");
  const [menuShow, setMenuShow] = useState(false);

  const about_details = {
    "Criado por": "Icaro Gagarin",
    "Email":"icarogagarincontato@gmail.com",
  }

  const menuActions = [
    { name: "Sair", handler: () => {
      setAlertDialog({
        open:true,
        title:"Sair do sistema?",
        text: "Tem certeza que deseja do sistema?",
        btn_cancel_text:"Não",
        btn_confirm_text:"Sim, sair",
        onConfirm: () => {
          localStorage.removeItem("token");
          window.location.href = "/login"
        }
      })
    }},
    { name: "Sobre", handler: () => setInfoDialog({data: about_details, open: true, title: "Sobre"}) },
  ]


  const setFilterChange = (e: any) => {
    const { name, value } = e.target;

    setFiltros((prev: any) => ({ ...prev, [name]: value }));
    setFiltroAplicado(true)

  }

  const clearFilter = () => {
    setFiltros({
      name: "",
      phoneNumber: "",
      dateScheduled: "",
      timeScheduled: "",
      userId: ""
    })
  }
  const locals = [
    {
      teacher : "Leticia",
      localName : "Adventista",
      localLink : "https://maps.app.goo.gl/2tT6k5LBbDz5rbg57"
    },
    {
      teacher : "Manoel",
      localName : "Clube dos Sargentos",
      localLink : "https://maps.app.goo.gl/zgNCgJt2NxLJXQzJ9"
    },
    {
      teacher : "Eduardo",
      localName : "Clube dos Sargentos",
      localLink : "https://maps.app.goo.gl/zgNCgJt2NxLJXQzJ9"
    },
    {
      teacher : "Frank ou Mateus",
      localName : "Circulo Militar",
      localLink : "https://maps.app.goo.gl/abDRnFL8ykSpFsKM7"
    },
    {
      teacher : "Leticia",
      localName : "Circulo Militar",
      localLink : "https://maps.app.goo.gl/abDRnFL8ykSpFsKM7"
    },
    {
      teacher : "Adão",
      localName : "Esplay",
      localLink : "https://maps.app.goo.gl/xDM8zektaTEWf5EZ6"
    }
  ]
  const setConfirmMessage = (local: string, modality: string, name: string, time : string, locallink : string, teacher : string, userId : string, day : string) => {
    if(local == "Circulo Militar" && modality == "Vôlei de areia")
    {
      teacher = "Leticia"
    }
    return `
Prontinho ${name}, agendada a sua aula experimental de ${modality} será às ${time}, no dia ${day} no ${local}
Lá você vai procurar pelo(a) professor(a) ${teacher}
> id do agendamento: ${userId}
Segue a localização: 
${locallink}

Qualquer duvida é só chamar 😊`
  }

  const [infoDialog, setInfoDialog] = useState({
    open: false,
    data:{},
    title: ""
  });

  const speedDialActions = [
    { icon: <FilterListIcon />, name: "Filtrar", handler: () => setOpenFilter(true) },
    { icon: <AddIcon />, name: "Adicionar", handler: () => setOpenForm(true) },
    { icon: <RefreshIcon />, name: "Atualizar", handler: () => setRefreshScheduled(!refreshScheduled) }
  ]

  const [data, setData] = useState({
    data: [
      {
        age: 0,
        local: 1,
        modality: 3,
        name: "teset",
        phoneNumber: "+5565981279162",
        state: 1,
        timeScheduled: "10/09/2025 09:00",
        _id: ""
      },
    ],
  });

  const filtroOnDelete = (value: keyof typeof filtros) => {
    const novo = { ...filtros };

    novo[value] = "";
    setFiltros(novo);
  }

  const handlers = {
    edit: (name: string) => {
      const scheduled = data.data.find(u => u.name == name);

      if (!scheduled) {
        setShowAlert(true);
        setSeverity("warning");
        setMessage("Agendamento não encontrado")
      } else {
        const [dateScheduled, timeScheduled] = scheduled.timeScheduled.split(" ");
        const [day, month, year] = dateScheduled.split("/")
        const scheduled_formt = {
          age: scheduled.age || 0,
          local: scheduled.local || 0,
          modality: scheduled.modality || 0,
          name: scheduled.name || "",
          phoneNumber: scheduled.phoneNumber || "",
          state: scheduled.state || 0,
          dateScheduled: `${year}-${month}-${day}` || "",
          timeScheduled: timeScheduled || "",
          userId: scheduled._id
        };
        setEditData(scheduled_formt)
        setEditForm(true);
      }

    },
    handlerDelete: (id: string, name: string) => {
      setAlertDialog({
        open: true,
        title: "Tem certeza?",
        text: `Tem certeza que deseja deletar o agendamento de : ${name} (ID: ${id})`,
        btn_cancel_text: "Não, voltar",
        btn_confirm_text: "Sim, delete",
        onConfirm: async () => HandlerConfirmDelete()
      });

      setUserId(id)
    },
    handlerSee: (userId: any) => {
      const scheduled = data.data.find(u => u._id == userId);
      if (scheduled) {
        const data_form = {
          "Telefone agendado": scheduled.phoneNumber,
          "Nome Completo": scheduled.name,
          "Idade":scheduled.age,
          "Dia e Horario Agendado": scheduled.timeScheduled,
          "Modalidade": ModalityFormat(scheduled.modality),
          "Local": LocalFormat(scheduled.local),
          "Situação do agendamento": formatState(scheduled.state as 0 | 1 | 2 | 3 | 4 | 5).label
        };
        setInfoDialog({
          open: true,
          data: data_form,
          title: "Informações do agendamento"
        });
        
      } else {
        setShowAlert(true);
        setSeverity("warning");
        setMessage("Agendamento não encontrado");
      }
    },
    handlerCopy: async (local: string, name: string, modality: string, time : string, userId : string, day : string) => {
      const localIndex = locals.find(l => l.localName == local);
      if(localIndex?.localName == "Circulo Militar" && modality == "vôlei de areia")
      {
        localIndex.teacher = "Leticia"
      }
      const payload = setConfirmMessage(local, modality, name, time, localIndex?.localLink || "local não encontrado", localIndex?.teacher || "Professor Não encontrado", userId, day)

      try {
        await navigator.clipboard.writeText(payload);
        setShowAlert(true);
        setSeverity("success");
        setMessage("Texto copiado para a área de transferência");
      } catch(err)
      {
        setShowAlert(true);
        setSeverity("warning");
        setMessage("Não foi possivel copiar o texto");
      }
    }
  }

  const HandlerConfirmDelete = async () => {
    try {
      const response = await deleteScheduled(userId);

      if (response.status == 200) {
        setShowAlert(true)
        setSeverity("success");
        setMessage(`${response.data.message}`)
        setAlertDialog({
          open: false,
          title: "",
          text: ``,
          btn_cancel_text: "",
          btn_confirm_text: "",
          onConfirm: () => { }
        });

      }
    } catch (err: any) {
      setShowAlert(true);
      setSeverity("warning");
      setMessage("Ocorreu um Erro : " + err.response.data.message)
      setAlertDialog({
        open: false,
        title: "",
        text: ``,
        btn_cancel_text: "",
        btn_confirm_text: "",
        onConfirm: () => { }
      });
    }
  }

  const HandlerEdit = async (formData: any) => {
    try {
      const [year, month, day] = formData.dateScheduled.split("-");
      const payload = {
        age: Number.parseInt(formData.age),
        dateScheduled: `${day}/${month}/${year}`,
        local: formData.local,
        modality: formData.modality,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        state: formData.state,
        timeScheduled: formData.timeScheduled
      }
      const response = await updateStudentById(formData.userId, payload);


      if (response.status == 200) {
        setShowAlert(true)
        setSeverity("success");
        setMessage(`${response.data.message}, id do agendamento : ${response.data.updatedUserId}`)
      }

      setRefreshScheduled(!refreshScheduled)

    } catch (err: any) {
      setShowAlert(true);
      setSeverity("warning");
      setMessage("Ocorreu um Erro : " + err.response.data.message)
    }
  }

  const HandlerForm = async (formData: any) => {
    try {


      const [year, month, day] = formData.dateScheduled.split("-");
      const payload = {
        age: Number.parseInt(formData.age),
        dateScheduled: `${day}/${month}/${year}`,
        local: formData.local,
        modality: formData.modality,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        state: formData.state,
        timeScheduled: formData.timeScheduled
      }

      const response = await sendScheduled(payload);

      if (response.status == 200) {
        setShowAlert(true)
        setSeverity("success");
        setMessage("Aluno criado com sucesso: " + response.data.message)
      }


      setRefreshScheduled(!refreshScheduled)



    } catch (err: any) {
      setShowAlert(true);
      setSeverity("warning");
      setMessage("Ocorreu um Erro : " + err.response.data.message)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllStudents();
        setData(response);
        setLoading(false)
        setShowAlert(true)
        setSeverity("success");
        setMessage("Agendamentos carregados");

      } catch (err) {
        console.log(err);
        setLoading(false);
        setShowAlert(true);
        setSeverity("error");
        setMessage("Ocorreu um erro ao buscar os agendamentos : " + err);
      } finally {
        setLoading(false)
      }
    }
    getData();
  }, [refreshScheduled]);


  const filterData = data.data.filter((item) => {
    const [year, month, day] = filtros.dateScheduled.split("-")
    const nameMatch = !filtros.name || item.name.includes(filtros.name);
    const phoneMatch = !filtros.phoneNumber || item.phoneNumber.includes(filtros.phoneNumber);
    const dateScheduled = !filtros.dateScheduled || item.timeScheduled.split(" ")[0].includes(`${day}/${month}/${year}`)
    const timeScheduled = !filtros.timeScheduled || item.timeScheduled.split(" ")[1].includes(filtros.timeScheduled)
    const userId = !filtros.userId || item._id.includes(filtros.userId);


    return nameMatch && phoneMatch && timeScheduled && dateScheduled && userId
  })


  const slide_props = ({ severity, message }: { severity: "error" | "success" | "warning" | "info", message: string }) => {
    return <Snackbar open={showAlert} autoHideDuration={4000} onClose={() => setShowAlert(false)}>
      <Alert severity={severity} sx={{
        width: "100%"
      }} action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => setShowAlert(false)}
          sx={{ ml: 2 }} // espaço à esquerda do botão
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }>
        {message}
      </Alert>
    </Snackbar>
  }
  if (loading) {
    return <Box sx={{ display: "flex", minHeight: "100vh", minWidth: "100vw", alignItems: "center", justifyContent: "center" }}>
      <CircularProgress></CircularProgress>
    </Box>
  }
  ;


  return (

    <><Box sx={{ p: 4, backgroundColor: '#0d0f18', minHeight: '100vh', color: 'white' }}>
      {openForm && (<Suspense>
        <AlertForm dataForm={formData} setDataForm={setFormData} open={openForm} setOpen={setOpenForm} handlerSubmit={HandlerForm} formTitle={"Lançar agendamento"} />
      </Suspense>)}
      {editForm && (<Suspense>
        <AlertForm dataForm={editData} setDataForm={setEditForm} open={editForm} setOpen={setEditForm} handlerSubmit={HandlerEdit} formTitle={"Editar agendamento"} />
      </Suspense>)}
      {openFilter && (
        <FilterDialog handlerLimparFiltro={clearFilter} handleFiltroChange={setFilterChange} open={openFilter} setOpen={setOpenFilter} filtros={filtros}></FilterDialog>
      )}

      {
        alertDialog && (<AlertDialog open={alertDialog.open} setOpen={setAlertDialog} title={alertDialog.title
        } text={alertDialog.text} handlerConfirm={alertDialog.onConfirm} btn_text_cancel={alertDialog.btn_cancel_text} btn_text_confirm={alertDialog.btn_confirm_text}></AlertDialog>)
      }
      {
        infoDialog.open && (
          <InfoDialog open={infoDialog.open} setOpen={setInfoDialog} data={infoDialog.data} title={infoDialog.title} />
        )
      }

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box
          component="img"
          sx={{
            width: '100%',
            maxWidth: 200,
            height: 'auto',
          }}
          alt="Logo"
          src={logo}
        />

        <Box>
          <CustomMenu open={menuShow} setOpen={setMenuShow} items={menuActions} />
        </Box>
      </Box>

      <Box width={"100%"}>
        <Box textAlign={"center"}>
          <Typography variant="h4" gutterBottom>
            Agendamentos de Aulas Experimentais
          </Typography>
        </Box>


        {!isMobile && <Box display="flex" justifyContent={"center"} gap={2} mb={3}>
          <Button variant="contained" color="primary" sx={{ color: "white" }} onClick={() => setOpenForm(true)}>Agendar Aula Experimental</Button>
          <Button variant="contained" color="success" sx={{ color: "white" }} onClick={() => setRefreshScheduled(!refreshScheduled)}>Atualizar</Button>
          <Button variant="contained" color="info" sx={{ color: "white" }} onClick={() => setOpenFilter(true)}>Filtrar</Button>
        </Box>}

        {filtroAplicado && <Typography variant='h6' component={"div"} display="flex" justifyContent={"center"} gap={2} mb={3}> Filtros :
          {Object.entries(filtros).map(([chave, value]) => (
            <React.Fragment key={chave}>{value && <Typography variant='h6' component={"div"}>
              <FilterChip value={value} onDelete={() => filtroOnDelete(chave as any)} /></Typography>}</React.Fragment>
          ))}
        </Typography>}




        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>

          <Grid container spacing={3} justifyContent={"center"} maxWidth={"100%"}>
            {
              filterData.map((_item) => (
                <CardsList key={_item._id} userId={_item._id} handlers={handlers} status_name={formatState(_item.state as 0 | 1 | 2 | 3 | 4 | 5).label} status={formatState(_item.state as 0 | 1 | 2 | 3 | 4 | 5).color} name={_item.name} local={LocalFormat(_item.local)} modality={ModalityFormat(_item.modality)} date={formatTimeScheduled(_item.timeScheduled).date} horario={formatTimeScheduled(_item.timeScheduled).time}></CardsList>
              ))
            }
          </Grid>

        </Box>
      </Box>

      {isMobile && (<SpeedDial
        ariaLabel='Ver mais ações'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<AddIcon />} />}>
        {speedDialActions.map(action => (
          <SpeedDialAction key={action.name} icon={action.icon} aria-label={action.name} tooltipTitle={action.name} onClick={action.handler}>

          </SpeedDialAction>
        ))}
      </SpeedDial>)}






      {showAlert && (slide_props({ message, severity }))}
    </Box>

    </>
  );
};

export default HomeScreen;
